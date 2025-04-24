import { SendEmailFields } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { emailAction } from "../_actions/email.action";
import catchError from "@/lib/utils/catch-error";

export default function useSendEmail() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: SendEmailFields) =>
      await catchError(() => emailAction(fields)),
  });

  return { isPending, error, send: mutate };
}
