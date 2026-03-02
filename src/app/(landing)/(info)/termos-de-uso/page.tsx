import InfoPageHeader from "@/src/app/(landing)/(info)/components/info-page-header";
import InfoPageLayout from "@/src/app/(landing)/(info)/components/info-page-layout";
import InfoPageTopics from "@/src/app/(landing)/(info)/components/info-page-topics";
import { InfoTopicType } from "@/src/app/(landing)/types/info-topic-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Leia os termos de uso do Precific. Conheça as condições de utilização, direitos e responsabilidades ao usar nossa plataforma.",
  keywords: [
    "termos de uso",
    "condições de uso",
    "termos de serviço",
    "contrato",
    "responsabilidades",
    "direitos",
    "precific",
  ],
  openGraph: {
    title: "Termos de Uso | Precific",
    description:
      "Leia os termos de uso do Precific. Conheça as condições de utilização, direitos e responsabilidades ao usar nossa plataforma.",
    url: "https://precificapp.com/termos-de-uso",
  },
  twitter: {
    title: "Termos de Uso | Precific",
    description:
      "Leia os termos de uso do Precific. Conheça as condições de utilização, direitos e responsabilidades ao usar nossa plataforma.",
  },
  alternates: {
    canonical: "/termos-de-uso",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  return (
    <InfoPageLayout>
      <InfoPageHeader
        title="Termos de Uso"
        description="Bem-vindo ao Precific! Estes Termos de Uso estabelecem as regras e
        condições para utilização da nossa plataforma de precificação
        inteligente. <br /> Ao acessar ou utilizar nossos serviços, você
        concorda integralmente com estes termos. Leia atentamente antes de
        prosseguir."
      />
      <InfoPageTopics topics={termsOfUseTopics} />
    </InfoPageLayout>
  );
}

const termsOfUseTopics: InfoTopicType[] = [
  {
    title: "1. Aceitação dos Termos",
    content:
      "Ao criar uma conta, acessar ou utilizar a plataforma Precific, o usuário declara ter lido, compreendido e aceito integralmente estes Termos de Uso. Se o usuário não concordar com qualquer disposição aqui apresentada, não deverá utilizar nossos serviços. Em caso de alterações relevantes nestes Termos, o Precific notificará os usuários com antecedência mínima de 15 dias por e-mail ou por aviso em destaque na plataforma. As alterações entrarão em vigor somente após esse prazo. Caso o usuário discorde das novas condições, poderá solicitar o encerramento de sua conta através dos canais de comunicação disponíveis em nosso site.",
  },
  {
    title: "2. Descrição do Serviço",
    content:
      "O Precific é uma plataforma de precificação inteligente que oferece as seguintes funcionalidades:",
    items: [
      "Cálculo automatizado de preços: Processamento de precificação com base em custos de aquisição, tributos (ICMS, PIS/COFINS, IPI, ICMS-ST) e margens de lucro definidas pelo usuário.",
      "Simulação tributária: Ferramenta para simular cenários estimativos de impacto da Reforma Tributária (IBS e CBS), com base em parâmetros legais e premissas vigentes. As simulações têm caráter informativo e não substituem orientação profissional especializada.",
      "Gestão de produtos: Cadastro, organização e acompanhamento de produtos com histórico de precificação.",
      "Importação em massa: Possibilidade de importar múltiplos produtos via planilha CSV para agilizar o processo de cadastro.",
      "Exportação de dados: Geração de relatórios e exportação de informações de precificação para análise externa.",
      "Dashboard e métricas: Visualização de indicadores e métricas consolidadas sobre os produtos cadastrados.",
    ],
  },
  {
    title: "3. Cadastro e Conta do Usuário",
    content:
      "Para utilizar o Precific, é necessário criar uma conta fornecendo informações verdadeiras e completas. O usuário é responsável por:",
    items: [
      "Fornecer dados cadastrais precisos e atualizados, incluindo informações pessoais e da empresa.",
      "Manter a confidencialidade de suas credenciais de acesso (e-mail e senha).",
      "Notificar imediatamente o Precific em caso de uso não autorizado da conta ou qualquer violação de segurança.",
      "Responder por todas as atividades realizadas através da sua conta, sendo responsável por qualquer ação praticada.",
      "Manter apenas uma conta ativa por usuário, salvo autorização expressa do Precific.",
    ],
  },
  {
    title: "4. Uso Adequado da Plataforma",
    content:
      "Ao utilizar o Precific, o usuário concorda em usar a plataforma de forma ética e em conformidade com a legislação vigente. É expressamente proibido:",
    items: [
      "Utilizar a plataforma para fins ilegais, fraudulentos ou que violem direitos de terceiros.",
      "Tentar acessar áreas restritas, sistemas ou redes conectadas à plataforma sem autorização.",
      "Interferir no funcionamento normal da plataforma, incluindo tentativas de sobrecarregar servidores ou introduzir vírus e códigos maliciosos.",
      "Reproduzir, copiar, vender, revender ou explorar comercialmente qualquer parte do serviço sem autorização prévia.",
      "Compartilhar credenciais de acesso com terceiros ou permitir que outros utilizem sua conta.",
      "Inserir informações falsas, enganosas ou que possam prejudicar outros usuários ou a operação da plataforma.",
      "Utilizar robôs, scrapers ou qualquer ferramenta automatizada para extrair dados da plataforma.",
    ],
  },
  {
    title: "5. Propriedade Intelectual",
    content:
      "Todos os direitos de propriedade intelectual relacionados ao Precific são de titularidade exclusiva do Precific e do Grupo Viriato, incluindo, mas não se limitando a:",
    items: [
      "Marca, logotipo, design visual e identidade da plataforma.",
      "Software, códigos-fonte, algoritmos de cálculo e funcionalidades do sistema.",
      "Conteúdos, textos, gráficos, imagens e materiais disponibilizados na plataforma.",
      "Metodologias de precificação e estrutura de cálculos tributários desenvolvidos.",
      "Nenhum direito de propriedade intelectual é transferido ao usuário pelo uso da plataforma. É proibida a reprodução, modificação, distribuição ou uso comercial de qualquer elemento sem autorização prévia por escrito.",
    ],
  },
  {
    title: "6. Dados e Conteúdo do Usuário",
    content:
      "O usuário mantém a titularidade sobre os dados e informações inseridos na plataforma (dados de produtos, custos, margens, etc.). Ao utilizar o Precific:",
    items: [
      "O usuário concede ao Precific licença para processar, armazenar e utilizar seus dados exclusivamente para prestação dos serviços contratados.",
      "O usuário é responsável pela veracidade, precisão e legalidade das informações inseridas na plataforma.",
      "O usuário reconhece que os cálculos de precificação são baseados nos dados fornecidos, sendo o Precific isento de responsabilidade por erros decorrentes de informações incorretas.",
      "O usuário pode solicitar a exportação ou exclusão de seus dados, observadas as obrigações legais e regulatórias aplicáveis, conforme nossa Política de Privacidade.",
    ],
  },
  {
    title: "7. Limitação de Responsabilidade",
    content:
      "O Precific se esforça para manter a plataforma funcionando de forma estável e precisa. No entanto, na máxima extensão permitida pela legislação aplicável:",
    items: [
      "Os serviços são fornecidos 'no estado em que se encontram', sem garantias de resultados específicos ou adequação a finalidades particulares.",
      "O Precific não garante que a plataforma estará disponível ininterruptamente ou livre de erros.",
      "O Precific não se responsabiliza por decisões comerciais, fiscais ou estratégicas tomadas com base nos cálculos da plataforma.",
      "A responsabilidade do Precific, em qualquer circunstância, será limitada ao valor pago pelo usuário nos últimos 12 meses de uso do serviço, na máxima extensão permitida pela legislação aplicável.",
      "O Precific não será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos.",
      "O Precific não se responsabiliza por falhas decorrentes de força maior, problemas de conectividade ou ações de terceiros fora de nosso controle.",
    ],
  },
  {
    title: "8. Disponibilidade e Modificações",
    content:
      "O Precific reserva-se o direito de, sempre que possível mediante comunicação prévia ao usuário:",
    items: [
      "Modificar, suspender ou descontinuar funcionalidades ou recursos da plataforma.",
      "Realizar manutenções programadas ou emergenciais que possam afetar temporariamente o acesso.",
      "Atualizar estes Termos de Uso para refletir mudanças nas funcionalidades, legislação ou políticas internas.",
      "Alterar estrutura de planos, preços e condições comerciais, respeitando contratos vigentes.",
      "Alterações significativas serão comunicadas através dos canais de comunicação cadastrados ou na própria plataforma.",
    ],
  },
  {
    title: "9. Planos e Pagamento",
    content:
      "O acesso a determinadas funcionalidades do Precific pode estar condicionado à contratação de planos pagos. Nestes casos:",
    items: [
      "Os valores, condições de pagamento e funcionalidades de cada plano serão informados no momento da contratação.",
      "O não pagamento pode resultar na suspensão ou limitação do acesso às funcionalidades premium.",
      "Reembolsos seguirão as políticas específicas comunicadas no momento da contratação.",
      "O Precific pode oferecer períodos de teste gratuito, cujas condições serão especificadas separadamente.",
    ],
  },
  {
    title: "10. Suspensão e Encerramento",
    content:
      "O Precific pode suspender ou encerrar o acesso do usuário à plataforma nas seguintes situações:",
    items: [
      "Violação de qualquer disposição destes Termos de Uso.",
      "Uso indevido ou abusivo da plataforma.",
      "Fornecimento de informações falsas ou fraudulentas.",
      "Não pagamento de valores devidos, quando aplicável.",
      "Solicitação do próprio usuário para encerramento da conta.",
      "Determinação judicial ou de autoridade competente.",
      "Em caso de encerramento, o usuário poderá solicitar exportação de seus dados dentro do prazo de 30 dias.",
    ],
  },
  {
    title: "11. Indenização",
    content:
      "O usuário concorda em defender, indenizar e isentar o Precific, o Grupo Viriato, seus diretores, funcionários, agentes e parceiros de qualquer reclamação, demanda, perdas, danos, custos ou despesas (incluindo honorários advocatícios) decorrentes de:",
    items: [
      "Violação destes Termos de Uso pelo usuário.",
      "Uso indevido da plataforma.",
      "Violação de direitos de terceiros.",
      "Informações incorretas ou ilegais inseridas na plataforma.",
    ],
  },
  {
    title: "12. Disposições Gerais",
    content: "Disposições finais que complementam estes Termos de Uso:",
    items: [
      "Integralidade: Estes termos constituem o acordo integral entre o usuário e o Precific, substituindo quaisquer acordos anteriores.",
      "Independência das cláusulas: Se qualquer disposição for considerada inválida ou inexequível, as demais permanecerão em pleno vigor.",
      "Tolerância: A não exigência de qualquer direito ou disposição não constituirá renúncia.",
      "Cessão: O usuário não pode ceder ou transferir seus direitos sem consentimento prévio do Precific.",
      "Comunicações: Notificações serão enviadas para o e-mail cadastrado ou através da plataforma.",
    ],
  },
  {
    title: "13. Foro",
    content:
      "Estes Termos de Uso serão regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca do Rio de Janeiro/RJ, com renúncia a qualquer outro, por mais privilegiado que seja, para dirimir quaisquer controvérsias decorrentes destes Termos.",
  },
  {
    title: "14. Contato",
    content:
      "Em caso de dúvidas, sugestões ou solicitações relacionadas a estes Termos de Uso, entre em contato conosco através dos canais de comunicação fornecidos em nosso site. Nosso compromisso é manter uma comunicação transparente e atender às suas necessidades da melhor forma possível.",
  },
];
