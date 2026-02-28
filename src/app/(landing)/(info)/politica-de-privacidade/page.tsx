import InfoPageHeader from "@/src/app/(landing)/(info)/components/info-page-header";
import InfoPageLayout from "@/src/app/(landing)/(info)/components/info-page-layout";
import InfoPageTopics from "@/src/app/(landing)/(info)/components/info-page-topics";
import { InfoTopicType } from "@/src/app/(landing)/types/info-topic-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Conheça nossa política de privacidade e saiba como protegemos seus dados pessoais.",
  keywords: [
    "política de privacidade",
    "lgpd",
    "proteção de dados",
    "privacidade",
    "dados pessoais",
    "segurança da informação",
    "precific",
  ],
  openGraph: {
    title: "Política de Privacidade | Precific",
    description:
      "Conheça nossa política de privacidade e saiba como protegemos seus dados pessoais.",
    url: "https://precificapp.com/politica-de-privacidade",
  },
  twitter: {
    title: "Política de Privacidade | Precific",
    description:
      "Conheça nossa política de privacidade e saiba como protegemos seus dados pessoais.",
  },
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPageLayout>
      <InfoPageHeader
        title="Política de Privacidade"
        description="Esta Política de Privacidade descreve como o Precific coleta, usa,
        armazena e protege as informações pessoais dos usuários da nossa
        plataforma. <br /> É importante ler atentamente esta
        política antes de utilizar nossos serviços ou fornecer quaisquer
        informações pessoais."
      />
      <InfoPageTopics topics={privacyPolicyTopics} />
    </InfoPageLayout>
  );
}

const privacyPolicyTopics: InfoTopicType[] = [
  {
    title: "1. Informações coletadas",
    content:
      "O Precific pode coletar as seguintes informações pessoais dos usuários:",
    items: [
      "Informações de cadastro: Nome completo, endereço de e-mail, senha (criptografada), telefone e informações da empresa.",
      "Informações de produtos: Dados de custos, margens de lucro, preços e demais informações inseridas na plataforma para cálculo de precificação.",
      "Informações de uso: Dados sobre como você utiliza a plataforma, incluindo endereço IP, tipo de dispositivo, navegador, páginas acessadas e tempo de uso.",
    ],
  },
  {
    title: "2. Uso das informações",
    content:
      "O Precific utiliza as informações coletadas para as seguintes finalidades:",
    items: [
      "Fornecer e operar a plataforma: Processar cálculos de precificação, armazenar dados de produtos e gerenciar sua conta.",
      "Melhorar nossos serviços: Analisar o uso da plataforma para desenvolver novos recursos e aprimorar a experiência do usuário.",
      "Comunicação: Enviar notificações importantes sobre sua conta, atualizações do serviço e responder a solicitações de suporte.",
      "Segurança: Proteger contra fraudes, abusos e atividades não autorizadas na plataforma.",
      "Cumprimento legal: Atender obrigações legais e regulatórias aplicáveis.",
    ],
  },
  {
    title: "3. Compartilhamento de informações",
    content:
      "O Precific não vende suas informações pessoais. Podemos compartilhar informações apenas nas seguintes situações:",
    items: [
      "Provedores de serviços: Com parceiros que auxiliam na operação da plataforma (hospedagem, processamento de pagamentos, análise de dados), todos sujeitos a acordos de confidencialidade.",
      "Requisitos legais: Quando exigido por lei, ordem judicial ou para proteger direitos, propriedade ou segurança do Precific e seus usuários.",
      "Transferência de negócios: Em caso de fusão, aquisição ou venda de ativos, suas informações podem ser transferidas, com notificação prévia.",
      "Com seu consentimento: Em qualquer outra situação, apenas com sua autorização expressa.",
    ],
  },
  {
    title: "4. Armazenamento e segurança de dados",
    content:
      "O Precific emprega medidas de segurança adequadas para proteger as informações pessoais dos usuários contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia de dados, protocolos HTTPS, autenticação segura e acesso restrito aos dados apenas para funcionários autorizados que necessitam das informações para desempenhar suas funções.",
  },
  {
    title: "5. Cookies e tecnologias similares",
    content:
      "O Precific utiliza exclusivamente cookies técnicos e de sessão, estritamente necessários para o funcionamento da plataforma, como autenticação de usuários e controle de fluxos de acesso.",
  },
  {
    title: "6. Alterações nesta política",
    content:
      "Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações em nossas práticas de tratamento de dados. Em caso de alterações relevantes, notificaremos os usuários com antecedência mínima de 15 dias por e-mail ou por aviso em destaque na plataforma. As alterações entrarão em vigor somente após esse período, e o usuário poderá, caso discorde das novas condições, solicitar o encerramento de sua conta e a exclusão de seus dados através dos canais de comunicação disponíveis em nosso site.",
  },
  {
    title: "7. Contato",
    content:
      "Se os usuários tiverem alguma dúvida, preocupação ou solicitação em relação a esta Política de Privacidade ou ao uso de suas informações pessoais, podem entrar em contato conosco através dos canais de comunicação fornecidos em nosso site.",
  },
];
