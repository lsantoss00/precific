"use client";

import xlsImage from "@/public/images/file-xls.webp";
import { importProducts } from "@/src/app/(private)/produtos/services/post-products-by-import";
import { Button } from "@/src/components/core";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Papa from "papaparse";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "sonner";

interface CSVRow {
  sku: string;
  nome: string;
  ncm: string;
  preço?: string;
  "preço em 2026"?: string;
  "preço em 2027"?: string;
  status?: string;
}

interface ImportSpreadsheetAreaProps {
  setIsImporting: Dispatch<SetStateAction<boolean>>;
  setImportProgress?: Dispatch<SetStateAction<number>>;
  onClose?: () => void;
}

export default function ImportSpreadsheetArea({
  setIsImporting,
  setImportProgress,
  onClose,
}: ImportSpreadsheetAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProgress = (value: number) => {
    if (setImportProgress) {
      setImportProgress(value);
    }
  };

  const importMutation = useMutation({
    mutationFn: async (csvData: CSVRow[]) => {
      updateProgress(60);

      const productsToImport = csvData.map((row) => ({
        sku: row.sku === "-" || !row.sku ? "-" : row.sku,
        name: row.nome === "-" || !row.nome ? "-" : row.nome,
        ncm: row.ncm === "-" || !row.ncm ? "-" : row.ncm,
        priceToday: row.preço ? parseCurrency(row.preço) : 0,
        priceIn2026: row["preço em 2026"]
          ? parseCurrency(row["preço em 2026"])
          : 0,
        priceIn2027: row["preço em 2027"]
          ? parseCurrency(row["preço em 2027"])
          : 0,
        status: "ACTIVE",
      }));

      updateProgress(75);

      const result = await importProducts(productsToImport);

      updateProgress(90);

      return result;
    },
    onSuccess: async () => {
      updateProgress(95);

      await queryClient?.invalidateQueries({ queryKey: ["products"] });
      await queryClient?.invalidateQueries({
        queryKey: ["product", "summaries"],
      });

      updateProgress(100);

      setTimeout(() => {
        toast.success(`Produtos importados com sucesso!`, {
          className: "!bg-green-600 !text-white",
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
        setIsImporting(false);
      }, 500);

      onClose?.();
    },
    onError: () => {
      toast.error(
        "Erro ao importar dados. Verifique o arquivo e tente novamente.",
        {
          className: "!bg-red-600 !text-white",
        },
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsImporting(false);
      updateProgress(0);
    },
  });

  const parseCurrency = (value: string): number => {
    if (!value || value === "-") return 0;
    const cleaned = value
      .replace(/R\$\s?/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    return parseFloat(cleaned) || 0;
  };

  const normalizeHeaders = (data: any[]): CSVRow[] => {
    return data.map((row) => {
      const normalized: any = {};
      Object.keys(row).forEach((key) => {
        const normalizedKey = key.toLowerCase().trim();
        normalized[normalizedKey] = row[key];
      });
      return normalized as CSVRow;
    });
  };

  const isValidRow = (row: any): boolean => {
    const sku = row.sku?.toString().trim();
    const nome = row.nome?.toString().trim();

    return (
      sku !== undefined &&
      sku !== "" &&
      sku !== "-" &&
      nome !== undefined &&
      nome !== "" &&
      nome !== "-"
    );
  };

  const processAndImportData = (allData: any[], totalRows: number) => {
    updateProgress(30);

    const normalizedData = normalizeHeaders(allData);

    updateProgress(40);

    const validRows = normalizedData.filter(isValidRow);
    const invalidCount = totalRows - validRows.length;

    if (validRows.length === 0) {
      toast.error(
        "Nenhuma linha válida encontrada. Verifique se os campos 'sku' e 'nome' estão preenchidos.",
        {
          className: "!bg-red-600 !text-white",
          duration: 5000,
        },
      );
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsImporting(false);
      updateProgress(0);
      return;
    }

    if (invalidCount > 0) {
      toast.warning(
        `${invalidCount} linha(s) ignorada(s) por falta de dados obrigatórios. ${validRows.length} produto(s) serão importados.`,
        {
          className: "!bg-yellow-600 !text-white",
          duration: 5000,
        },
      );
    }

    updateProgress(50);

    importMutation.mutate(validRows as CSVRow[]);
  };

  const processXLSX = async (file: File) => {
    updateProgress(10);

    const XLSX = await import("xlsx");

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        updateProgress(20);

        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
          defval: "",
        });

        if (!jsonData || jsonData.length === 0) {
          toast.error("Nenhum dado encontrado no arquivo", {
            className: "!bg-red-600 !text-white",
          });
          if (fileInputRef.current) fileInputRef.current.value = "";
          setIsImporting(false);
          updateProgress(0);
          return;
        }

        processAndImportData(jsonData, jsonData.length);
      } catch (error) {
        toast.error("Erro ao processar arquivo XLSX", {
          className: "!bg-red-600 !text-white",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        setIsImporting(false);
        updateProgress(0);
      }
    };

    reader.onerror = () => {
      toast.error("Erro ao ler o arquivo", {
        className: "!bg-red-600 !text-white",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsImporting(false);
      updateProgress(0);
    };

    reader.readAsArrayBuffer(file);
  };

  const processCSV = (file: File) => {
    updateProgress(10);

    Papa.parse(file, {
      header: true,
      transformHeader: (header) => header.toLowerCase().trim(),
      skipEmptyLines: true,
      quoteChar: '"',
      escapeChar: '"',
      delimitersToGuess: [",", "\t", "|", ";"],
      transform: (value) => value.trim(),
      complete: (results) => {
        updateProgress(20);

        if (!results.data || results.data.length === 0) {
          toast.error("Nenhum dado encontrado no arquivo CSV", {
            className: "!bg-red-600 !text-white",
          });
          if (fileInputRef.current) fileInputRef.current.value = "";
          setIsImporting(false);
          updateProgress(0);
          return;
        }

        processAndImportData(results.data, results.data.length);
      },
      error: () => {
        toast.error("Erro ao ler o arquivo CSV", {
          className: "!bg-red-600 !text-white",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        setIsImporting(false);
        updateProgress(0);
      },
    });
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    const validExtensions = [".xls", ".xlsx", ".csv"];
    const fileExtension = file.name
      .toLowerCase()
      .slice(file.name.lastIndexOf("."));

    if (!validExtensions.includes(fileExtension)) {
      toast.error("Arquivo inválido. Apenas .xls, .xlsx ou .csv são aceitos.", {
        className: "!bg-red-600 !text-white",
      });
      return;
    }

    setIsImporting(true);
    updateProgress(0);

    if (fileExtension === ".csv") {
      processCSV(file);
    } else if (fileExtension === ".xlsx" || fileExtension === ".xls") {
      processXLSX(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full h-full border-1 border-dashed rounded-md transition-colors p-4 ${
        isDragging
          ? "border-primary bg-primary/50"
          : "border-primary bg-primary/10"
      }`}
    >
      <div className="h-full max-w-110 flex flex-col justify-center items-center m-auto">
        <div className="flex flex-col items-center space-y-5">
          <Image
            src={xlsImage}
            alt="Ilustração de arquivo XLS"
            width={50}
            height={50}
            className="select-none pointer-events-none"
          />
          <p className="text-center">
            Clique no botão abaixo ou arraste um arquivo de extensão .xls, .xlsx
            ou .csv para importar seus produtos.
          </p>
          <Button
            onClick={handleButtonClick}
            disabled={importMutation.isPending}
            className="shrink-0 h-14 w-full md:max-w-56 bg-primary text-white flex items-center gap-2"
          >
            Fazer upload de planilha
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xls,.xlsx,.csv"
          onChange={handleFileInput}
          disabled={importMutation.isPending}
          className="hidden"
        />
      </div>
    </div>
  );
}
