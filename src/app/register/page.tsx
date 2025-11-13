"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { registerAction } from "../../features/auth/server/auth.action";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import {
  RegisterUserWithConfirmPassData,
  registerUserWithConfirmPassSchema,
} from "@/features/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ resolver: zodResolver(registerUserWithConfirmPassSchema) });
  const router = useRouter();

  const onSubmit = async (data: RegisterUserWithConfirmPassData) => {
    const response = await registerAction(data);
    if (response?.success) {
      toast.success(response?.message);
      if (data.role === "applicant") {
        router.push("/dashboard");
      } else {
        router.push("/employer-dashboard");
      }
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <div className="w-[85%] md:w-[50%] lg:w-[40%] mx-auto flex justify-center mt-20 rounded-3xl bg-gray-100 shadow-md">
        <div className="form-container p-6 w-full m-0.5 sm:m-1 md:m-2 lg:m-2 flex justify-center flex-col text-center rounded-3xl bg-white shadow-sm">
          <h2 className="text-4xl font-extrabold">JobPort</h2>
          <h3 className="text-lg font-light text-gray-400">Register Page</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-2 grid text-left gap-3">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="my-2 grid text-left gap-3">
              <Label htmlFor="userName">UserName</Label>
              <Input
                id="userName"
                type="text"
                placeholder="UserName"
                {...register("userName")}
                className={`pl-10 ${
                  errors.userName ? "border-destructive" : ""
                }`}
              />
              {errors.userName && (
                <p className="text-sm text-destructive">
                  {errors.userName.message}
                </p>
              )}{" "}
            </div>

            <div className="my-2 grid text-left gap-3">
              <Label htmlFor="userName">Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applicant">Job Applicant</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-sm text-destructive">
                  {errors.role.message}
                </p>
              )}{" "}
            </div>

            <div className="my-2 grid text-left gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="my-2 grid text-left gap-3">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className={`pl-10 ${
                    errors.password ? "border-destructive" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="my-2 grid text-left gap-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className={`pl-10 ${
                    errors.confirmPassword ? "border-destructive" : ""
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="my-4">
              <Button variant="outline" type="submit">
                Submit
              </Button>
            </div>
            <div className="my-2 items-center gap-2 flex justify-center">
              <span className="text-gray-400">Already have an account?</span>
              <span>
                <Link href="/login">Sign in here</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
