import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  console.log({ user });

  if (!user) redirect("/login");
  if (user.role !== "applicant") redirect("/employer-dashboard");

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
