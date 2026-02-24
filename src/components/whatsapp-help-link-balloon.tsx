"use client";

import WhatsAppIcon from "@/public/svgs/whatsapp-logo.svg";
import { Card } from "@/src/components/core/card";
import { whatsAppHelpLink } from "@/src/utils/whatsapp-help-link";
import { useState } from "react";
import Row from "./core/row";

const WhatsAppHelpLinkBalloon = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Row className="fixed bottom-4.5 right-4 flex items-center gap-3 z-50">
      <Card
        className={`px-4 py-2 duration-300 whitespace-nowrap pointer-events-none ${
          isHovered ? "block" : "hidden"
        }`}
      >
        <span className="text-sm font-medium">Precisa de ajuda?</span>
      </Card>
      <a
        className="bg-[#25D366] hover:bg-[#25D366]/80 h-12 w-12 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl duration-300 transition-colors"
        href={whatsAppHelpLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Link para suporte via WhatsApp"
      >
        <WhatsAppIcon className="text-white h-7 w-7" />
      </a>
    </Row>
  );
};

export default WhatsAppHelpLinkBalloon;
