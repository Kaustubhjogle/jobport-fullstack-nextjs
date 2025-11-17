import { db } from "@/config/db";

export interface RegisterFormData {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "applicant" | "employer";
}

export interface LoginFormData {
  email: string;
  password: string;
}

// Give me the type of the first parameter of the callback inside db.transaction — that's the tx object
export type DbClient =
  | typeof db
  | Parameters<Parameters<typeof db.transaction>[0]>[0];

export interface UserSessionData {
  token: string;
  ip: string;
  userAgent: string;
  userId: number;
  tx?: DbClient;
}
