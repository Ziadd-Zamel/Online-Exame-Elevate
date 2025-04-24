import { PasswordResetFields } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { resetAction } from "../_actions/reset.action";
import catchError from "@/lib/utils/catch-error";

export default function useResetPassword() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: PasswordResetFields) => {
      await catchError(() => resetAction(fields));
    },
  });

  return { isPending, error, resetPassword: mutate };
}
