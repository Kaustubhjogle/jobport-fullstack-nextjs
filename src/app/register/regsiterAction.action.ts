"use server";
import argon2 from "@node-rs/argon2";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { RegisterFormData } from "@/types/auth";

export const registerAction = async (formData: RegisterFormData) => {
  try {
    const { name, userName, email, password, role } = formData;
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
