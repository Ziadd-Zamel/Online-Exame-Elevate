import { VerifyPasswordFields } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { verifyAction } from "../_actions/verify.action";
import catchError from "@/lib/utils/catch-error";

export default function useVerifyCode() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: VerifyPasswordFields) =>
      await catchError(() => verifyAction(fields)),
  });

  return { isPending, error, verfiyCode: mutate };
}
