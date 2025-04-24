"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { SendEmailFields } from "@/lib/schemes/auth.schema";

export const emailAction = async (sendEmailFields: SendEmailFields) => {
  const respones = await fetch(`${process.env.API}/auth/forgotPassword`, {
    method: "POST",
    body: JSON.stringify(sendEmailFields),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload = await respones.json();
  return payload;
};
