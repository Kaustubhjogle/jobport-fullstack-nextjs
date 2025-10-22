"use server";
import argon2 from "@node-rs/argon2";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { LoginFormData, RegisterFormData } from "@/types/auth";
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

export const loginUserAction = async (formData: LoginFormData) => {
  try {
    const { password, email } = formData;
    const [presentUserDetails] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (!presentUserDetails)
      return {
        success: false,
        message: "User with given email not present",
      };
    const isValidPassword = await argon2.verify(
      presentUserDetails.password,
      password
    );
    if (isValidPassword) {
      return {
        success: true,
        message: "Login Successfull",
      };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  } catch (e) {
    return { success: false, message: "Error while User Login" };
  }
};
