"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { registerAction } from "./regsiterAction.action";
import { RegisterFormData } from "@/types/auth";
import { toast } from "sonner";

const Page: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    userName: "",
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangeInput = (name: string, value: string): any => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event?.preventDefault();
    const finalFormData = {
      name: formData?.name.trim(),
      userName: formData?.userName.trim(),
      password: formData.password.trim(),
      confirmPassword: formData?.confirmPassword?.trim(),
      email: formData.email.trim().toLowerCase(),
    };

    if (formData?.password !== formData?.confirmPassword)
      return alert("The Confirm Password field must match the Password field.");
    const response = await registerAction(finalFormData);
    if (response?.success) {
      toast.success(response?.message);
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
          <form onSubmit={handleFormSubmit}>
            <div className="my-2 grid items-center gap-3">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e): ChangeEvent =>
                  handleChangeInput("name", e.target.value)
                }
              />
            </div>
            <div className="my-2 grid items-center gap-3">
              <Label htmlFor="userName">UserName</Label>

              <Input
                name="userName"
                type="text"
                placeholder="UserName"
                value={formData.userName}
                onChange={(e): ChangeEvent =>
                  handleChangeInput("userName", e.target.value)
                }
              />
            </div>
            <div className="my-2 grid items-center gap-3">
              <Label htmlFor="email">Email</Label>

              <Input
                name="email"
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

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e): ChangeEvent =>
                    handleChangeInput("password", e.target.value)
                  }
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
            </div>
            <div className="my-2 grid items-center gap-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e): ChangeEvent =>
                    handleChangeInput("confirmPassword", e.target.value)
                  }
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
