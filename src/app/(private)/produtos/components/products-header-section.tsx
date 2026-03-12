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
import PageTitle from "@/src/components/page-title";
import PlanCrownBadge from "@/src/components/plan-crown-badge";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useAuth } from "@/src/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { Package, PlusCircle } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductsHeaderSection = () => {
  const { hasReachedProductLimit, plan } = useAuth();
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
        Preço: currencyFormatter(Number(product.priceToday) * 100) || "-",
        "Preço em 2026":
          currencyFormatter(Number(product.priceIn2026) * 100) || "-",
        "Preço em 2027":
          currencyFormatter(Number(product.priceIn2027) * 100) || "-",
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
        <PageTitle
          icon={<Package size={26} className="shrink-0" />}
          title="Produtos"
        />
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
          <Button
            disabled={hasReachedProductLimit}
            className="hover:cursor-pointer w-fit disabled:bg-primary/90! disabled:text-whit relative"
          >
            <Link href="/produtos/novo" className="flex flex-row gap-2">
              <PlusCircle aria-hidden="true" />
              <span>Novo Produto</span>
            </Link>
            <Show when={hasReachedProductLimit}>
              <div className="h-6 w-6 absolute -right-2 -top-2">
                <PlanCrownBadge />
              </div>
            </Show>
          </Button>
          <ExportDataButton
            onClick={handleExport}
            pending={isFetching}
            disabled={!plan?.canExportData}
          />
        </Row>
      </Flex>
    </Column>
  );
};

export default ProductsHeaderSection;
