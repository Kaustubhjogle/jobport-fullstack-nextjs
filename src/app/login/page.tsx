"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginUserData, loginUserSchema } from "@/features/auth/auth.schema";
import { loginUserAction } from "@/features/auth/server/action.auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginUserSchema) });

  const handleFormSubmit = async (data: LoginUserData) => {
    try {
      const response = await loginUserAction(data);
      if (response?.success) {
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="w-[85%] md:w-[50%] lg:w-[40%] mx-auto flex justify-center mt-20 rounded-3xl bg-gray-100 shadow-md">
        <div className="form-container p-6 w-full m-0.5 sm:m-1 md:m-2 lg:m-2 flex justify-center flex-col text-center rounded-3xl bg-white shadow-sm">
          <h2 className="text-4xl font-extrabold">JobPort</h2>
          <h3 className="text-lg font-light text-gray-400">Login Page</h3>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="my-2 grid gap-3 text-left">
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
            <div className="my-2 grid gap-3 text-left">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`pl-10 ${
                  errors.password ? "border-destructive" : ""
                }`}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="my-4">
              <Button variant="outline">Submit</Button>
            </div>
            <div className="my-2 items-center gap-2 flex justify-center">
              <span className="text-gray-400">Dont have an account?</span>
              <span>
                <Link href="/register">Create account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
