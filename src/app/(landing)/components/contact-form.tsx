"use client";

import { postLead } from "@/src/app/(landing)/services/post-lead";
import { Button } from "@/src/components/core/button";
import { Checkbox } from "@/src/components/core/checkbox";
import Column from "@/src/components/core/column";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import { MaskedInput } from "@/src/components/core/masked-input";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ComponentProps, useRef, useState } from "react";
import ReCAPTCHAComponent from "react-google-recaptcha";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
}) as React.ForwardRefExoticComponent<
  ComponentProps<typeof ReCAPTCHAComponent> &
    React.RefAttributes<ReCAPTCHAComponent>
>;

const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, "O campo nome é obrigatório.")
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(80, "O nome deve ter no máximo 80 caracteres."),
  cnpj: z
    .string()
    .min(1, "O campo CNPJ é obrigatório.")
    .length(14, "CNPJ inválido. Deve conter 14 dígitos."),
  email: z
    .string()
    .min(1, "O campo email é obrigatório.")
    .email("Email inválido.")
    .max(100, "O email deve ter no máximo 100 caracteres."),
  phone: z
    .string()
    .min(1, "O campo telefone é obrigatório.")
    .refine(
      (val) => val.length === 10 || val.length === 11,
      "Telefone inválido. Deve conter 10 ou 11 dígitos.",
    )
    .max(11, "O telefone não pode exceder 11 dígitos."),
  acceptMarketing: z.boolean(),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos."),
  recaptcha: z.string().optional(),
});

type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;

const ContactForm = () => {
  const [loadRecaptcha, setLoadRecaptcha] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHAComponent>(null);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isValid },
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(ContactFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      cnpj: "",
      email: "",
      phone: "",
      acceptMarketing: false,
      acceptTerms: false,
      recaptcha: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: postLead,
    onSuccess: () => {
      toast.success(
        <span>
          Formulário enviado com sucesso!
          <br />
          Em breve entraremos em contato.
        </span>,
        { className: "!bg-green-600 !text-white" },
      );
      reset();
      recaptchaRef.current?.reset();
    },
    onError: () => {
      toast.error(
        <span>
          Erro ao enviar formulário.
          <br />
          Por favor, tente novamente mais tarde.
        </span>,
        { className: "!bg-red-600 !text-white" },
      );
      recaptchaRef.current?.reset();
    },
  });

  const handleSubmitContactForm = async (data: ContactFormSchemaType) => {
    if (!loadRecaptcha) {
      setLoadRecaptcha(true);
      toast.info("Validando segurança... Tente enviar novamente.");
      return;
    }

    if (!recaptchaRef.current) return;

    const token = await recaptchaRef.current.executeAsync();

    if (!token) {
      toast.error("Erro na validação do reCAPTCHA. Tente novamente.");
      return;
    }

    contactMutation.mutate({
      lead: { ...data, recaptcha: token },
    });
  };

  const { name, cnpj, email, phone } = watch();
  const formInputFieldIsBlank = [name, cnpj, email, phone].some(
    (value) => value === "",
  );

  return (
    <form
      id="contactForm"
      onSubmit={handleSubmit(handleSubmitContactForm)}
      className="space-y-3 md:space-y-4 flex flex-col justify-between w-full max-w-md self-center"
      onMouseEnter={() => setLoadRecaptcha(true)}
      onFocusCapture={() => setLoadRecaptcha(true)}
      onTouchStart={() => setLoadRecaptcha(true)}
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Column>
            <Input
              id="name"
              placeholder="Nome"
              autoComplete="name"
              value={value}
              onChange={onChange}
              maxLength={80}
              className={`bg-black/20 placeholder:text-zinc-400! text-white border-white focus-visible:border-white focus-visible:ring-white/50 h-10 md:h-11 text-sm md:text-base ${
                error && "border-red-600"
              }`}
            />
            <div
              className={`${error ? "h-3" : "h-0"} transition-all duration-200`}
            >
              <Show when={error}>
                <span className="text-xs text-red-600">{error?.message}</span>
              </Show>
            </div>
          </Column>
        )}
      />
      <Controller
        name="cnpj"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Column>
            <MaskedInput
              id="cnpj"
              mask="00.000.000/0000-00"
              placeholder="CNPJ"
              value={value}
              onAccept={onChange}
              unmask={true}
              maxLength={18}
              className={`bg-black/20 placeholder:text-zinc-400! text-white border-white focus-visible:border-white focus-visible:ring-white/50 h-10 md:h-11 text-sm md:text-base ${
                error && "border-red-600"
              }`}
            />
            <div
              className={`${error ? "h-3" : "h-0"} transition-all duration-200`}
            >
              <Show when={error}>
                <span className="text-xs text-red-600">{error?.message}</span>
              </Show>
            </div>
          </Column>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Column>
            <Input
              id="email"
              placeholder="E-mail"
              autoComplete="email"
              value={value}
              onChange={onChange}
              maxLength={100}
              className={`bg-black/20 placeholder:text-zinc-400! text-white border-white focus-visible:border-white focus-visible:ring-white/50 h-10 md:h-11 text-sm md:text-base ${
                error && "border-red-600"
              }`}
            />
            <div
              className={`${error ? "h-3" : "h-0"} transition-all duration-200`}
            >
              <Show when={error}>
                <span className="text-xs text-red-600">{error?.message}</span>
              </Show>
            </div>
          </Column>
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Column>
            <MaskedInput
              id="phone"
              mask={[{ mask: "(00) 0000-0000" }, { mask: "(00) 0 0000-0000" }]}
              placeholder="Telefone"
              value={value}
              onAccept={onChange}
              unmask={true}
              maxLength={15}
              className={`bg-black/20 placeholder:text-zinc-400! text-white border-white focus-visible:border-white focus-visible:ring-white/50 h-10 md:h-11 text-sm md:text-base ${
                error && "border-red-600"
              }`}
            />
            <div
              className={`${error ? "h-3" : "h-0"} transition-all duration-200`}
            >
              <Show when={error}>
                <span className="text-xs text-red-600">{error?.message}</span>
              </Show>
            </div>
          </Column>
        )}
      />
      <Row className="gap-2 items-center">
        <Controller
          name="acceptMarketing"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              id="acceptMarketing"
              checked={value}
              onCheckedChange={onChange}
              className="bg-black/20! data-[state=checked]:border-white focus-visible:border-white focus-visible:ring-white/50"
            />
          )}
        />
        <Label
          htmlFor="acceptMarketing"
          className="cursor-pointer text-white font-normal text-xs md:text-sm leading-tight"
        >
          Aceito receber comunicações de marketing e promoções exclusivas do
          Precific
        </Label>
      </Row>
      <Row className="gap-2 items-center">
        <Controller
          name="acceptTerms"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              id="acceptTerms"
              checked={value}
              onCheckedChange={onChange}
              className="bg-black/20! data-[state=checked]:border-white focus-visible:border-white focus-visible:ring-white/50"
            />
          )}
        />
        <Label
          htmlFor="acceptTerms"
          required
          className="cursor-pointer text-white font-normal text-xs md:text-sm leading-tight"
        >
          Li e aceito os{" "}
          <Link
            target="_blank"
            href="/termos-de-uso"
            className="underline hover:text-secondary"
          >
            Termos de Uso
          </Link>{" "}
          e a{" "}
          <Link
            target="_blank"
            href="/politica-de-privacidade"
            className="underline hover:text-secondary"
          >
            Política de Privacidade
          </Link>
        </Label>
      </Row>
      <div
        className="absolute h-0 w-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {loadRecaptcha && (
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          />
        )}
      </div>
      <Button
        className="h-12 md:h-14 text-sm md:text-base"
        type="submit"
        variant="secondary"
        disabled={
          contactMutation.isPending || formInputFieldIsBlank || !isValid
        }
      >
        <Show when={contactMutation.isPending}>
          <Loader2Icon className="animate-spin" />
        </Show>
        Eu quero precificar!
      </Button>
      <p className="text-[10px] text-zinc-400 text-center opacity-70">
        Este site é protegido pelo reCAPTCHA e a
        <Link
          href="https://policies.google.com/privacy"
          className="underline ml-1"
        >
          Privacidade
        </Link>{" "}
        e
        <Link
          href="https://policies.google.com/terms"
          className="underline ml-1"
        >
          Termos
        </Link>{" "}
        do Google se aplicam.
      </p>
    </form>
  );
};

export default ContactForm;
