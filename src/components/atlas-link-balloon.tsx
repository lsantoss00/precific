"use client";

import AtlasTributarioIcon from "@/public/svgs/atlas-logo.svg";
import { Card } from "@/src/components/core/card";
import { useState } from "react";
import Row from "./core/row";

const AtlasLinkBalloon = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Isso aqui vai ser um link para o site do Atlas Tributário no futuro.
  const whatsAppNumber = "+552122929071";
  const whatsAppMessage =
    "Ol%C3%A1%2C%20quero%20conhecer%20o%20Atlas%20Tribut%C3%A1rio!";
  const whatsAppLink = `https://wa.me/${whatsAppNumber}?text=${whatsAppMessage}`;

  return (
    <Row className="fixed bottom-16 right-4 flex items-center gap-3 z-50">
      <Card
        className={`px-4 py-2 duration-300 whitespace-nowrap pointer-events-none ${
          isHovered ? "block" : "hidden"
        }`}
      >
        <span className="text-sm font-medium">Conheça o Atlas Tributário</span>
      </Card>
      <a
        className="bg-zinc-800 h-12 w-12 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl hover:bg-zinc-700 duration-300 transition-colors"
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Link para Atlas Tributário"
      >
        <AtlasTributarioIcon className="text-white h-7 w-7" />
      </a>
    </Row>
  );
};

export default AtlasLinkBalloon;
