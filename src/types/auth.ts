export interface RegisterFormData {
  name: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "applicant" | "employer";
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface UserSessionData {
  token: string;
  ip: string;
  userAgent: string;
  userId: number;
}
