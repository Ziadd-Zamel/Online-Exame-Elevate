"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { VerifyPasswordFields } from "@/lib/schemes/auth.schema";

export const verifyAction = async (
  VerifyPasswordFields: VerifyPasswordFields
) => {
  const response = await fetch(`${process.env.API}/auth/verifyResetCode`, {
    method: "POST",
    body: JSON.stringify(VerifyPasswordFields),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload = await response.json();
  return payload;
};
