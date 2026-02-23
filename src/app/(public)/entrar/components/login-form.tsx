"use client";

import AuthFormCard from "@/src/components/auth-form-card";
import { Button } from "@/src/components/core/button";
import Column from "@/src/components/core/column";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import Show from "@/src/components/core/show";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { supabaseErrorsTranslator } from "@/src/utils/supabase-errors-translator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { login } from "../services/login";

const LoginFormSchema = z.object({
  email: z.string().min(1, "O campo email é obrigatório."),
  password: z.string().min(1, "O campo senha é obrigatório."),
});

type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const router = useRouter();

  const { handleSubmit, control, watch } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: doLogin, isPending: pendingLogin } = useMutation({
    mutationFn: login,
    onSuccess: async (result) => {
      if (result?.success) {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/produtos");
      }
      if (result?.error) {
        toast.error(supabaseErrorsTranslator(result.error), {
          className: "!bg-red-600 !text-white",
        });
      }
    },
  });

  const handleLogin = ({ email, password }: LoginFormSchemaType) => {
    doLogin({ email, password });
  };

  const { email, password } = watch();
  const formInputFieldIsBlank = [email, password].some((value) => value === "");

  return (
    <AuthFormCard>
      <form
        id="login-form"
        onSubmit={handleSubmit(handleLogin)}
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
                  autoComplete="current-password"
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
            disabled={pendingLogin || formInputFieldIsBlank}
          >
            <Show when={pendingLogin}>
              <Loader2Icon className="animate-spin" />
            </Show>
            Entrar
          </Button>
          <Link
            href="/redefinir-senha"
            className="flex self-center w-fit"
            passHref
          >
            <Button type="button" variant="link" className="">
              Esqueci minha senha
            </Button>
          </Link>
        </Column>
      </form>
    </AuthFormCard>
  );
};

export default LoginForm;
