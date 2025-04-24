"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { PasswordResetFields } from "@/lib/schemes/auth.schema";

export const resetAction = async (PasswordResetFields: PasswordResetFields) => {
  const respones = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    body: JSON.stringify(PasswordResetFields),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload = await respones.json();
  return payload;
};
