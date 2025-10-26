"use server";
import argon2 from "@node-rs/argon2";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { eq, or } from "drizzle-orm";
import {
  registerUserSchema,
  RegisterUserData,
  LoginUserData,
  loginUserSchema,
} from "../auth.schema";
import { success } from "zod";

export const registerAction = async (formData: RegisterUserData) => {
  try {
    const { data: validatedData, error } =
      registerUserSchema.safeParse(formData);
    if (error) return { success: false, message: error.issues[0].message };

    const { name, userName, email, password, role } = validatedData;

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

export const loginUserAction = async (formData: LoginUserData) => {
  try {
    const { data, error } = loginUserSchema.safeParse(formData);
    if (error) return { success: false, message: error.issues[0].message };
    const { password, email } = data;
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
