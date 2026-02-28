import logoImage from "@/public/images/precific-logo-image.webp";
import BorderBeam from "@/src/components/animations/border-beam";
import { Card } from "@/src/components/core/card";
import Flex from "@/src/components/core/flex";
import Image from "next/image";

interface AuthFormCardProps {
  children: React.ReactNode;
}

const AuthFormCard = ({ children }: AuthFormCardProps) => {
  return (
    <Card
      as="article"
      className="relative rounded-2xl p-6 mx-4 shadow-sm w-full max-w-125 items-center bg-white overflow-clip"
    >
      <Flex as="figure" className="mb-10">
        <Image
          src={logoImage}
          alt="Precific | Plataforma de Precificação Inteligente"
          className="w-full h-auto max-w-75"
          priority
          fetchPriority="high"
          loading="eager"
        />
      </Flex>
      {children}
      <BorderBeam duration={8} size={100} />
    </Card>
  );
};

export default AuthFormCard;
