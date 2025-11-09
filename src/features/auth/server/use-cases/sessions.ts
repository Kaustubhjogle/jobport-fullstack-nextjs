import crypto from "crypto";
import { cookies, headers } from "next/headers";
import { getIPAddress } from "./location";
import { UserSessionData } from "@/types/auth";
import { db } from "@/config/db";
import { sessions, users } from "@/drizzle/schema";
import { SESSION_LIFETIME, SESSION_REFERESH_TIME } from "@/config/constants";
import { eq } from "drizzle-orm";

const createSessionToken = () => {
  return crypto.randomBytes(32).toString("hex").normalize();
};

const createUserSession = async ({
  token,
  ip,
  userAgent,
  userId,
}: UserSessionData) => {
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");
  const [result] = await db.insert(sessions).values({
    id: hashedToken,
    userId,
    expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000),
    ip,
    userAgent,
  });

  return result;
};

export const createSessionAndSetCookies = async (userId: number) => {
  const token = createSessionToken();
  const headerList = await headers();
  const ip = await getIPAddress();

  await createUserSession({
    token,
    ip,
    userAgent: headerList.get("user-agent") || "",
    userId: userId,
  });

  const cookie = await cookies();
  cookie.set("session", token, {
    secure: true,
    httpOnly: true,
    maxAge: SESSION_LIFETIME,
  });
};

export const validateSessionAndGetUserData = async (session: string) => {
  const hashedToken = crypto
    .createHash("sha-256")
    .update(session)
    .digest("hex");

  const [user] = await db
    .select({
      id: users.id,
      session: {
        id: sessions.id,
        expiresAt: sessions.expiresAt,
        userAgent: sessions.userAgent,
        ip: sessions.ip,
      },
      name: users.name,
      userName: users.userName,
      email: users.email,
      role: users.role,
      phoneNumber: users.phoneNumber,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(sessions)
    .where(eq(sessions.id, hashedToken))
    .innerJoin(users, eq(users.id, sessions.userId));

  if (!user) return null;

  if (Date.now() >= user?.session?.expiresAt.getTime()) {
    await invalidateSession(session);
  }

  if (
    Date.now() >=
    user?.session?.expiresAt.getTime() - SESSION_REFERESH_TIME * 1000
  ) {
    await db
      .update(sessions)
      .set({ expiresAt: new Date(Date.now() + SESSION_LIFETIME * 1000) })
      .where(eq(sessions.id, user.session.id));
  }

  return user;
};

export const invalidateSession = async (id: string) => {
  await db.delete(sessions).where(eq(sessions.id, id));
};
