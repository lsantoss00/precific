"use client";

import videoThumbnail from "@/public/images/opengraph-image.webp";
import { Button } from "@/src/components/core/button";
import Row from "@/src/components/core/row";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type YouTubeEmbedProps = {
  videoId: string;
  title?: string;
  className?: string;
};

const YouTubeEmbed = ({
  videoId,
  title = "Vídeo",
  className = "",
}: YouTubeEmbedProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const embedBase = `https://www.youtube.com/embed/${videoId}`;
  const embedParams = "rel=0&modestbranding=1&playsinline=1&controls=1";

  return (
    <div className={`w-full h-full ${className}`}>
      {!isLoading ? (
        <Button
          type="button"
          aria-label={`Carregar vídeo: ${title}`}
          onClick={() => setIsLoading(true)}
          variant="ghost"
          className="group relative w-full h-full p-0 overflow-hidden rounded-md bg-black"
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={videoThumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 brightness-50"
              priority
            />
          </div>
          <Row className="absolute left-0 bottom-0 gap-4 p-2 md:p-4 pointer-events-none bg-transparent w-full">
            <Row
              className="justify-center bg-primary rounded-full p-2 shadow-lg"
              aria-hidden
            >
              <Play className="w-5 h-5 text-white" />
            </Row>
          </Row>
        </Button>
      ) : (
        <div className="relative w-full h-full rounded-md bg-foreground">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-md"
            src={`${embedBase}?${embedParams}&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed;
