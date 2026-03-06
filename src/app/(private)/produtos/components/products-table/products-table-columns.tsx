"use client";

import { Button } from "@/src/components/core/button";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { Switch } from "@/src/components/core/switch";
import CustomTooltip from "@/src/components/custom-tooltip";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { useAuth } from "@/src/providers/auth-provider";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Info, Loader2Icon, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import SortableHeader from "../../../../../components/core/sortable-header";
import { ProductResponseType } from "../../types/product-type";

interface ProductTableMeta {
  onViewProductDetails: (product: Partial<ProductResponseType>) => void;
  onDeleteProduct: (productId: string, productName: string) => void;
  pendingDeleteProduct: boolean;
  onUpdateProductStatus: (productId: string, productStatus: string) => void;
  pendingUpdateProductStatus: boolean;
  pricedProductsQuantity: number;
}

export const productsTableColumns: ColumnDef<Partial<ProductResponseType>>[] = [
  {
    id: "sku",
    accessorKey: "sku",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>SKU</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-20 sm:w-25">
        {row.getValue("sku")}
      </div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "name",
    accessorKey: "name",
    size: 200,
    header: ({ column }) => (
      <SortableHeader column={column}>NOME</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-full md:w-45 lg:w-62.5 xl:w-75 min-w-0">
        {row.getValue("name")}
      </div>
    ),
    meta: {
      className:
        "table-cell w-full max-w-[150px] md:max-w-[180px] lg:max-w-[250px] xl:max-w-[300px] truncate min-w-0",
    },
  },
  {
    id: "ncm",
    accessorKey: "ncm",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>NCM</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis">
        {row.getValue("ncm")}
      </div>
    ),
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    id: "priceToday",
    accessorKey: "priceToday",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>
        <CustomTooltip
          className="text-muted-foreground!"
          message="Preço de Venda do seu produto ANTES de usar a plataforma"
          icon={<Info />}
        />
        HOJE
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-20  ml-2">
        {currencyFormatter((row.getValue<number>("priceToday") ?? 0) * 100)}
      </div>
    ),
    meta: {
      className: "hidden lg:table-cell",
    },
  },
  {
    id: "priceIn2026",
    accessorKey: "priceIn2026",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>
        <CustomTooltip
          className="text-muted-foreground!"
          message="Preço de Venda do seu produto DEPOIS de usar a plataforma"
          icon={<Info />}
        />
        2026
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-20  ml-2">
        {currencyFormatter((row.getValue<number>("priceIn2026") ?? 0) * 100)}
      </div>
    ),
    meta: {
      className: "hidden 2xl:table-cell",
    },
  },
  {
    id: "priceIn2027",
    accessorKey: "priceIn2027",
    size: 80,
    header: ({ column }) => (
      <SortableHeader column={column}>
        <CustomTooltip
          className="text-muted-foreground!"
          message="Em breve"
          icon={<Info />}
        />
        2027
      </SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="uppercase truncate text-ellipsis w-20 ml-2">
        {currencyFormatter((row.getValue<number>("priceIn2027") ?? 0) * 100)}
      </div>
    ),
    meta: {
      className: "hidden 2xl:table-cell",
    },
  },
  {
    id: "status",
    accessorKey: "status",
    size: 60,
    header: ({ column }) => (
      <SortableHeader column={column}>STATUS</SortableHeader>
    ),
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const product = row.original;
      const isActive = row.getValue("status") === "ACTIVE";

      return (
        <div className="flex items-center">
          <Switch
            checked={isActive}
            onCheckedChange={(checked) => {
              meta?.onUpdateProductStatus?.(
                product.id!,
                checked ? "ACTIVE" : "INACTIVE",
              );
            }}
            disabled={
              meta?.pendingUpdateProductStatus || meta?.pendingDeleteProduct
            }
          />
        </div>
      );
    },
    meta: {
      className: "hidden 2xl:table-cell",
    },
  },
  {
    id: "actions",
    enableHiding: false,
    size: 120,
    header: () => <div className="w-25 sm:w-30" />,
    cell: ({ row, table }) => {
      const meta = table.options.meta as ProductTableMeta;
      const product = row.original;
      const { isPremium } = useAuth();

      const priceIn2026 = product?.priceIn2026 ?? 0;
      const isPriced = priceIn2026 > 0;
      const freeLimitReached = (meta?.pricedProductsQuantity ?? 0) >= 10;

      const isOverLimit = !isPremium && !isPriced && freeLimitReached;

      const cannotEditExisting = !isPremium && isPriced;

      const isDisabled =
        meta?.pendingUpdateProductStatus ||
        meta?.pendingDeleteProduct ||
        isOverLimit ||
        cannotEditExisting;

      return (
        <Row className="justify-end space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => meta?.onViewProductDetails(product)}
            aria-label="Visualizar Produto"
            className="hover:bg-primary/20  hover:text-primary"
          >
            <Eye />
          </Button>
          <Show
            when={!isDisabled}
            fallback={
              <Button variant="ghost" size="icon" disabled={true}>
                <Pencil />
              </Button>
            }
          >
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:bg-primary/20  hover:text-primary"
              disabled={
                meta?.pendingUpdateProductStatus || meta?.pendingDeleteProduct
              }
              aria-label="Precificar Produto"
            >
              <Link href={`/produtos/${product.id}`}>
                <Pencil />
              </Link>
            </Button>
          </Show>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => meta?.onDeleteProduct(product.id!, product.name!)}
            disabled={isDisabled}
            aria-label="Excluir produto"
            className="hover:bg-red-200  hover:text-red-500"
          >
            <Show
              when={!meta?.pendingDeleteProduct}
              fallback={<Loader2Icon className="animate-spin" />}
            >
              <Trash2 />
            </Show>
          </Button>
        </Row>
      );
    },
    meta: {
      className: "table-cell",
    },
  },
];
