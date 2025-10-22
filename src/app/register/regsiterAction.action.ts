"use server";
import argon2 from "@node-rs/argon2";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { RegisterFormData } from "@/types/auth";
import { eq, or } from "drizzle-orm";

export const registerAction = async (formData: RegisterFormData) => {
  try {
    const { name, userName, email, password, role } = formData;

    const [presentUserDetails] = await db
      .select()
      .from(users)
      .where(or(eq(users.userName, userName), eq(users.email, email)));
    if (presentUserDetails) {
      if (presentUserDetails.email === email) {
        return {
          success: false,
          message: "User with same email already present",
        };
      } else {
        return {
          success: false,
          message: "User with same username already present",
        };
      }
    }

    const hashedPassword = await argon2.hash(password);
    await db
      .insert(users)
      .values({ name, userName, email, password: hashedPassword, role });

    return { success: true, message: "User added successfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Error while registering User" };
  }
};
