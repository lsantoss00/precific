"use client";

import spreadsheetExampleImage from "@/public/images/spreadsheet-example.webp";
import { Button } from "@/src/components/core/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/core/dialog";
import ImportSpreadsheetArea from "@/src/components/multiple-import-dialog/import-spreadsheet-area";
import MultipleImportLoadingState from "@/src/components/multiple-import-dialog/multiple-import-loading-state";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MultipleImportDialogProps {
  trigger: React.ReactNode;
}

const MultipleImportDialog = ({ trigger }: MultipleImportDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importProgress, setImportProgress] = useState<number>(0);

  const handleDownloadSpreadsheetExample = async () => {
    const res = await fetch("/files/planilha-exemplo-precific.csv");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "planilha-exemplo-precific.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex flex-col max-w-[90dvw] md:max-w-[96dvw] lg:max-w-3xl py-10 sm:p-8 overflow-y-auto max-h-[96dvh] 2xl:max-h-full">
        {isImporting ? (
          <MultipleImportLoadingState progress={importProgress} />
        ) : (
          <>
            <DialogTitle className="text-2xl text-dark font-bold">
              Importação de Produtos
            </DialogTitle>
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-3">
              <p className="text-sm">
                Para realizar a importação de planilha, siga as instruções
                abaixo para preencher a planilha corretamente.
              </p>

              <Button
                aria-label="download-spreadsheet-example"
                className="shrink-0 h-12 w-full md:max-w-60 bg-green-500 hover:bg-green-600 !ring-green-600 text-white"
                onClick={handleDownloadSpreadsheetExample}
              >
                <Download className="h-5 w-5" />
                Baixar planilha exemplo
              </Button>
            </div>
            <div className="gap-1 mb-4 md:mb-9">
              <span className="text-xs text-neutral-500">
                Exemplo de preenchimento da planilha
              </span>
              <div className="overflow-x-auto">
                <Image
                  src={spreadsheetExampleImage}
                  alt="Exemplo de preenchimento correto da planilha de importação de produtos"
                  width={1040}
                  height={150}
                  placeholder="blur"
                  className="min-w-137.5"
                />
              </div>
            </div>
            <div className="h-full">
              <ImportSpreadsheetArea
                setIsImporting={setIsImporting}
                setImportProgress={setImportProgress}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MultipleImportDialog;
