"use client";

import AuthFormCard from "@/src/components/auth-form-card";
import { Button } from "@/src/components/core/button";
import Column from "@/src/components/core/column";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import Show from "@/src/components/core/show";
import { createClient } from "@/src/libs/supabase/client";
import { supabaseErrorsTranslator } from "@/src/utils/supabase-errors-translator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { recoveryPassword } from "../services/recovery-password";

const RecoveryPasswordSchema = z.object({
  email: z.string().min(1, "O campo email é obrigatório."),
});

type RecoveryPasswordSchemaType = z.infer<typeof RecoveryPasswordSchema>;

const RecoveryPasswordForm = () => {
  const searchParams = useSearchParams();

  const { handleSubmit, control, watch } = useForm<RecoveryPasswordSchemaType>({
    resolver: zodResolver(RecoveryPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: doRecoveryPassword, isPending: pendingDoRecoveryPassword } =
    useMutation({
      mutationFn: recoveryPassword,
      onSuccess: (result) => {
        if (result.success) {
          toast.success("E-mail enviado com sucesso!", {
            className: "!bg-green-600 !text-white",
          });
        } else {
          toast.error(supabaseErrorsTranslator(result.error), {
            className: "!bg-red-600 !text-white",
          });
        }
      },
    });

  const handleRecoveryPassword = ({ email }: RecoveryPasswordSchemaType) => {
    doRecoveryPassword({ email });
  };

  const { email } = watch();

  const formInputFieldIsBlank = [email].some((value) => value === "");

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "invalid_token") {
      toast.error(
        "Link de recuperação inválido ou expirado. Aguarde alguns instantes e solicite um novo.",
        {
          className: "!bg-red-600 !text-white",
        },
      );

      const supabase = createClient();
      supabase.auth.signOut();
    }
  }, [searchParams]);

  return (
    <AuthFormCard>
      <form
        id="login-form"
        onSubmit={handleSubmit(handleRecoveryPassword)}
        className="space-y-4 flex flex-col justify-between w-full"
      >
        <Column className="space-y-2">
          <Label htmlFor="email" required>
            E-mail
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="email"
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="mt-5">
          <Button
            className="hover:cursor-pointer w-full"
            type="submit"
            disabled={pendingDoRecoveryPassword || formInputFieldIsBlank}
          >
            <Show when={pendingDoRecoveryPassword}>
              <Loader2Icon className="animate-spin" />
            </Show>
            Enviar instruções
          </Button>
          <Link href="/entrar" className="flex self-center w-fit" passHref>
            <Button type="button" variant="link" className="">
              Voltar ao Login
            </Button>
          </Link>
        </Column>
      </form>
    </AuthFormCard>
  );
};

export default RecoveryPasswordForm;
