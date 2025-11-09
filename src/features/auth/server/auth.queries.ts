import { cookies } from "next/headers";
import { cache } from "react";
import { validateSessionAndGetUserData } from "./use-cases/sessions";

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  const user = await validateSessionAndGetUserData(session);

  return user;
});
