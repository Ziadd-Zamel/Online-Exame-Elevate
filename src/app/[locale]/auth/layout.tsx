import React from 'react';
import AuthLayout from './_components/auth-layout';

const layout = ({ children }: LayoutProps) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
