"use client";

import { Button } from "@/src/components/core/button";
import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import { User, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type UserUploadProps = {
  initialPreview?: string | null;
  onChange?: (file: File | null) => void;
};

const UserImageUpload = ({ initialPreview, onChange }: UserUploadProps) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(initialPreview || null);
  }, [initialPreview]);

  return (
    <Card
      className="p-4.5 w-full shadow-2xs transition-colors duration-200 border-neutral-100 flex flex-col md:flex-row md:items-center rounded-sm relative cursor-pointer hover:bg-neutral-100 gap-4"
      onClick={() => ref.current?.click()}
    >
      <div className="min-h-24 w-24 rounded-md flex border-2 border-primary relative overflow-hidden shrink-0">
        <Show
          when={preview}
          fallback={<User className="w-8 h-8 text-primary m-auto" />}
        >
          <Image
            src={preview!}
            alt="Preview"
            fill
            sizes="192px"
            className="object-cover"
            priority
            unoptimized={preview?.startsWith("blob:")}
          />
        </Show>
      </div>
      <Column>
        <p className="text-base font-medium">Selecionar foto</p>
        <span className="text-sm text-neutral-500 mt-1 font-normal">
          Selecione um arquivo com até 5mb.
        </span>
      </Column>
      <Show when={preview}>
        <Button
          variant="ghost"
          className="flex w-12 cursor-pointer absolute right-0 top-0"
          onClick={(e) => {
            e.stopPropagation();
            setPreview(null);
            if (onChange) onChange(null);
          }}
          aria-label="Remover imagem"
        >
          <XIcon />
        </Button>
      </Show>
      <input
        ref={ref}
        id="profilePicture"
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const fileList = e.target.files || [];
          if (fileList.length > 0) {
            const file = fileList[0];

            if (file) {
              if (file.size > 5 * 1024 * 1024) {
                e.target.value = "";
                toast.error("Arquivo muito grande. O tamanho máximo é 5MB.", {
                  className: "!bg-red-600 !text-white",
                });
                return;
              }

              if (onChange) {
                const objectUrl = URL.createObjectURL(file);
                setPreview(objectUrl);
                onChange(file);
              }
            }
          }
          e.target.value = "";
        }}
      />
    </Card>
  );
};

export default UserImageUpload;
