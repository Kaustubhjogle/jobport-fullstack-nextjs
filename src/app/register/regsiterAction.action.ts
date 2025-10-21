"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { RegisterFormData } from "@/types/auth";

export const registerAction = async (formData: RegisterFormData) => {
  const { name, userName, email, password, role } = formData;
  console.log("formData in action", formData);
  await db.insert(users).values({ name, userName, email, password, role });
};
