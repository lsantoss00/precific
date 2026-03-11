const errorMessagesTranslation: Record<string, string> = {
  invalid_credentials: "E-mail ou senha inválidos.",
  email_not_confirmed:
    "E-mail não confirmado. Verifique sua caixa de entrada ou reenvie a confirmação.",
  weak_password:
    "A senha deve conter ao menos um caractere de cada tipo: letras minúsculas, letras maiúsculas, números e símbolos.",
  over_request_rate_limit:
    "Muitas solicitações. Tente novamente em alguns instantes.",
  over_email_send_rate_limit:
    "Muitos e-mails enviados. Aguarde antes de tentar novamente.",
  request_timeout: "Tempo de processamento excedido. Tente novamente.",
  refresh_token_not_found: "Sessão expirada. Faça login novamente.",
  refresh_token_already_used: "Sessão inválida. Faça login novamente.",
  bad_jwt: "Sessão inválida. Faça login novamente.",
  no_authorization: "Autorização ausente. Faça login para continuar.",
  bad_json: "Requisição inválida. Verifique os dados enviados.",
  email_address_invalid: "Endereço de e-mail inválido.",
  user_not_found: "Usuário não encontrado.",
  user_banned:
    "Seu acesso à plataforma expirou. Caso queira continuar usando o Precific, entre em contato conosco.",
  conflict: "Conflito de operação. Aguarde um instante e tente novamente.",

  'duplicate key value violates unique constraint "companies_cnpj_unique"':
    "Já existe uma empresa cadastrada com esse CNPJ.",

  "Unable to validate email address: invalid format":
    "Endereço de e-mail inválido.",

  //  Erros de plano
  NO_ACTIVE_PLAN: "Sua empresa não possui um plano ativo.",
  PLAN_INACTIVE: "Seu plano está inativo. Renove sua assinatura.",
  PRODUCT_LIMIT_REACHED: "Você atingiu o limite de produtos do seu plano.",
  DELETE_NOT_ALLOWED: "Seu plano não permite excluir produtos.",
  UPDATE_NOT_ALLOWED: "Seu plano não permite editar produtos.",
  USER_LIMIT_REACHED: "Limite de usuários atingido para o plano.",
};

type SupabaseError =
  | { message?: string; code?: string }
  | string
  | null
  | undefined;

export function supabaseErrorsTranslator(error: SupabaseError): string {
  if (!error) return "Ocorreu um erro inesperado.";

  let key: string;

  if (typeof error === "string") {
    key = error;
  } else {
    key = (error as any).hint || error.code || error.message || "";
  }

  if (errorMessagesTranslation[key]) {
    return errorMessagesTranslation[key];
  }

  if (typeof error === "string") return error;

  return error.message || "Ocorreu um erro inesperado.";
}
