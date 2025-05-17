import React from "react";
import AuthLayout from "./_components/auth-layout";

export default function layout({ children }: LayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
