import crypto from "crypto";
import { cookies, headers } from "next/headers";
import { getIPAddress } from "./location";
import { UserSessionData } from "@/types/auth";
import { db } from "@/config/db";
import { sessions } from "@/drizzle/schema";
import { SESSION_LIFETIME } from "@/config/constants";

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
