export interface RegisterFormData {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "applicant" | "employer";
}
