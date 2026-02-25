"use client";

import AuthFormCard from "@/src/components/auth-form-card";
import { Button } from "@/src/components/core/button";
import Column from "@/src/components/core/column";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import Show from "@/src/components/core/show";
import { supabaseErrorsTranslator } from "@/src/utils/supabase-errors-translator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { newPassword } from "../services/new-password";

const PasswordFormSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "O campo confirmar senha é obrigatório."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type PasswordFormSchemaType = z.infer<typeof PasswordFormSchema>;

const PasswordForm = () => {
  const router = useRouter();
  const [isInviteFlow, setIsInviteFlow] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const hasInviteCookie = cookies.some((cookie) =>
      cookie.trim().startsWith("invite_mode=true"),
    );
    setIsInviteFlow(hasInviteCookie);
  }, []);

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm<PasswordFormSchemaType>({
    resolver: zodResolver(PasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: doCreateNewPassword, isPending: pendingCreateNewPassword } =
    useMutation({
      mutationFn: newPassword,
      onSuccess: async (result) => {
        if (result?.success) {
          toast.success(
            isInviteFlow
              ? "Senha criada com sucesso!"
              : "Senha alterada com sucesso!",
          );
          router.push("/entrar");
        } else {
          toast.error(supabaseErrorsTranslator(result.error));
        }
      },
    });

  const handleCreateNewPassword = ({ password }: PasswordFormSchemaType) => {
    doCreateNewPassword({ password });
  };

  const { password, confirmPassword } = watch();
  const formInputFieldIsBlank = [password, confirmPassword].some(
    (value) => value === "",
  );

  return (
    <AuthFormCard>
      <form
        id="password-form"
        onSubmit={handleSubmit(handleCreateNewPassword)}
        className="space-y-4 flex flex-col justify-between w-full"
      >
        <Column className="space-y-2">
          <Label htmlFor="password" required>
            Senha
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="password"
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
        <Column className="space-y-2">
          <Label htmlFor="confirmPassword" required>
            Confirmar Senha
          </Label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="password"
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
            pending={pendingCreateNewPassword}
            disabled={
              pendingCreateNewPassword || formInputFieldIsBlank || !isValid
            }
          >
            <Show when={pendingCreateNewPassword}>
              <Loader2Icon className="animate-spin" />
            </Show>
            {isInviteFlow ? "Criar Senha" : "Alterar Senha"}
          </Button>
        </Column>
      </form>
    </AuthFormCard>
  );
};

export default PasswordForm;
