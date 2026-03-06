"use client";

import { getProductsForExport } from "@/src/app/(private)/produtos/services/get-products-for-export";
import { Button } from "@/src/components/core/button";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import ExportDataButton from "@/src/components/export-data-button";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useAuth } from "@/src/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { Package, PlusCircle, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductsHeaderSection = () => {
  const { isLoadingAuth, isPremium } = useAuth();

  const [search, setSearch] = useQueryState(
    "filtro",
    parseAsString.withDefault("").withOptions({
      shallow: false,
      clearOnDefault: true,
    }),
  );

  const [, setPage] = useQueryState(
    "pagina",
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const [inputValue, setInputValue] = useState(search);
  const debouncedSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearch(debouncedSearch || null);

    if (debouncedSearch !== search) {
      setPage(null);
    }
  }, [debouncedSearch]);

  const { refetch, isFetching } = useQuery({
    queryFn: () => getProductsForExport({ search }),
    queryKey: ["products-export", search],
    enabled: false,
  });

  const handleExport = async () => {
    try {
      const result = await refetch();

      if (!result.data || result.data.length === 0) {
        toast.error("Não há dados para exportar", {
          className: "!bg-red-600 !text-white",
        });
        return;
      }

      const Papa = (await import("papaparse")).default;

      const formattedData = result.data.map((product) => ({
        SKU: product.sku || "-",
        Nome: product.name || "-",
        NCM: product.ncm || "-",
        Preço: currencyFormatter(Number(product.priceToday)) || "-",
        "Preço em 2026": currencyFormatter(Number(product.priceIn2026)) || "-",
        "Preço em 2027": currencyFormatter(Number(product.priceIn2027)) || "-",
        Status: product.status === "INACTIVE" ? "Inativo" : "Ativo",
      }));

      const csv = Papa.unparse(formattedData);
      const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `produtos_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast.success("Dados exportados com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
    } catch (error) {
      toast.error("Erro ao exportar dados", {
        className: "!bg-red-600 !text-white",
      });
    }
  };

  return (
    <Column as="header" className="space-y-3 w-full">
      <Flex className="md:items-center gap-2 justify-between flex-col-reverse md:flex-row">
        <Row className="items-center gap-2">
          <Package size={26} className="shrink-0" />
          <h1 className="text-3xl font-semibold">Produtos</h1>
        </Row>
        <Show when={!isLoadingAuth && !isPremium}>
          <Flex className="bg-secondary/5 border border-secondary rounded-md gap-2 p-1.5 items-center">
            <TriangleAlert className="text-secondary shrink-0" />
            <span className="text-sm">
              No <strong className="font-semibold">Plano Gratuito</strong> não é
              possível editar ou excluir produtos e o limite de precificação é
              de 10 produtos.
            </span>
          </Flex>
        </Show>
      </Flex>
      <Flex className="flex-col lg:flex-row justify-between lg:items-center w-full gap-4">
        <div className="w-full lg:max-w-120">
          <Label htmlFor="search-products" className="sr-only">
            Buscar produtos
          </Label>
          <Input
            id="search-products"
            className="w-full"
            placeholder="Buscar por SKU, Nome ou NCM"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            aria-label="Buscar produtos por SKU, Nome ou NCM"
            isSearchInput
          />
        </div>
        <Row
          as="nav"
          className="space-x-2 w-full lg:w-fit lg:justify-end"
          aria-label="Ações de produtos"
        >
          <Button asChild className="hover:cursor-pointer w-fit h-12 ">
            <Link href="/produtos/novo">
              <PlusCircle aria-hidden="true" />
              <span>Novo Produto</span>
            </Link>
          </Button>
          <ExportDataButton onClick={handleExport} pending={isFetching} />
          {/* <MultipleImportDialog
            trigger={
              <Button className="hover:cursor-pointer flex-1 md:flex-none md:w-fit h-12">
                <Upload className="text-white" aria-hidden="true" />
                <span className="hidden sm:flex">Importar</span>
                <span className="sr-only sm:hidden">Importar produtos</span>
              </Button>
            }
          /> */}
        </Row>
      </Flex>
    </Column>
  );
};

export default ProductsHeaderSection;
