"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUserAction } from "@/features/auth/server/action.auth";
import { LoginFormData } from "@/types/auth";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const Page: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    password: "",
    email: "",
  });

  const handleChangeInput = (name: string, value: string): any => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    const finalData = {
      password: formData?.password?.trim(),
      email: formData?.email?.trim(),
    };
    const response = await loginUserAction(finalData);
    if (response?.success) {
      toast.success(response.message);
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <div>
      <div className="w-[85%] md:w-[50%] lg:w-[40%] mx-auto flex justify-center mt-20 rounded-3xl bg-gray-100 shadow-md">
        <div className="form-container p-6 w-full m-0.5 sm:m-1 md:m-2 lg:m-2 flex justify-center flex-col text-center rounded-3xl bg-white shadow-sm">
          <h2 className="text-4xl font-extrabold">JobPort</h2>
          <h3 className="text-lg font-light text-gray-400">Login Page</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="my-2 grid items-center gap-3">
              <Label htmlFor="email">Email</Label>

              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e): ChangeEvent =>
                  handleChangeInput("email", e.target.value)
                }
              />
            </div>
            <div className="my-2 grid items-center gap-3">
              <Label htmlFor="password">Password</Label>

              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e): ChangeEvent =>
                  handleChangeInput("password", e.target.value)
                }
              />
            </div>
            <div className="my-4">
              <Button variant="outline" type="submit">
                Submit
              </Button>
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
