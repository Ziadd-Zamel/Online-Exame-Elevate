import React from "react";
import AuthLayout from "./_components/auth-layout";

export default function Layout({ children }: LayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
