"use client";

import ConfirmDeleteProductDialog from "@/src/app/(private)/produtos/components/products-table/confirm-delete-product-dialog";
import ProductDetailsDialog from "@/src/app/(private)/produtos/components/products-table/product-details-dialog";

import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/core/table";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getProducts } from "../../services/get-products";
import { updateProductStatus } from "../../services/update-product-status";
import { ProductResponseType } from "../../types/product-type";
import { productsTableColumns } from "./products-table-columns";
import { ProductsTablePagination } from "./products-table-pagination";

const ProductsTable = () => {
  const { company, profile } = useAuth();
  const router = useRouter();

  const [search] = useQueryState("filtro", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState(
    "pagina",
    parseAsInteger.withDefault(1),
  );
  const [sortBy, setSortBy] = useQueryState(
    "ordenar",
    parseAsString.withDefault("created_at"),
  );
  const [sortOrder, setSortOrder] = useQueryState(
    "ordem",
    parseAsStringLiteral(["asc", "desc"] as const).withDefault("desc"),
  );

  const pageSize = 10;
  const pricedProductsQuantity = company?.pricedProductsQuantity;

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    productId: string;
    productName: string;
  } | null>(null);
  const [openProductDetailsDialog, setOpenProductDetailsDialog] =
    useState(false);
  const [productToView, setProductToView] =
    useState<Partial<ProductResponseType> | null>(null);

  const sorting = useMemo<SortingState>(
    () => [{ id: sortBy, desc: sortOrder === "desc" }],
    [sortBy, sortOrder],
  );

  const { data, isPending } = useQuery({
    queryFn: () => getProducts({ page, pageSize, search, sortBy, sortOrder }),
    queryKey: [
      "products",
      profile?.companyId,
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
    ],
    enabled: !!profile?.companyId,
  });

  const { mutate: updateStatus, isPending: pendingUpdateProductStatus } =
    useMutation({
      mutationFn: updateProductStatus,
      onSuccess: async (_, variables) => {
        queryClient.setQueryData(
          [
            "products",
            profile?.companyId,
            page,
            pageSize,
            search,
            sortBy,
            sortOrder,
          ],
          (old: Awaited<ReturnType<typeof getProducts>> | undefined) =>
            old
              ? {
                  ...old,
                  data: old.data.map((product) =>
                    product.id === variables.productId
                      ? {
                          ...product,
                          status: variables.status as "ACTIVE" | "INACTIVE",
                        }
                      : product,
                  ),
                }
              : old,
        );
        await queryClient.invalidateQueries({
          queryKey: ["product", "summaries"],
        });
        toast.success(`Status atualizado com sucesso!`, {
          className: "!bg-green-600 !text-white",
        });
      },
      onError: (error) => {
        toast.error(error.message, { className: "!bg-red-600 !text-white" });
      },
    });

  const products = data?.data ?? [];

  const table = useReactTable({
    data: products,
    columns: productsTableColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    state: { sorting },
    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      const sortItem = nextSorting[0];

      if (sortItem) {
        setSortBy(sortItem.id);
        setSortOrder(sortItem.desc ? "desc" : "asc");
      } else {
        setSortBy(null);
        setSortOrder(null);
      }
      setPage(1);
    },
    meta: {
      onViewProductDetails: (product: Partial<ProductResponseType>) => {
        setProductToView(product);
        setOpenProductDetailsDialog(true);
      },
      onDeleteProduct: (productId: string, productName: string) => {
        setProductToDelete({ productId, productName });
        setOpenConfirmDeleteDialog(true);
      },
      onPriceProduct: (productId: string) =>
        router.push(`/produtos/${productId}`),
      onUpdateProductStatus: (productId: string, productStatus: string) =>
        updateStatus({ productId, status: productStatus }),
      pendingUpdateProductStatus,
      pricedProductsQuantity,
    },
  });

  const hasData = !isPending && products.length > 0;

  return (
    <Column className="bg-white shadow-md flex flex-col h-160.5! overflow-hidden rounded-md">
      <div className="flex-1 overflow-hidden relative">
        <Table className="w-full table-fixed">
          <TableHeader className="sticky top-0 z-10 h-14">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent!">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.column.columnDef.size }}
                    className={`text-neutral-400 ${header.column.columnDef.meta?.className ?? ""}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {hasData &&
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.columnDef.size }}
                      className={`px-4 ${cell.column.columnDef.meta?.className ?? ""}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Show when={!hasData}>
          <div className="absolute inset-0 top-14 flex items-center justify-center">
            <Show when={isPending} fallback={<span>Sem resultados.</span>}>
              <Row className="justify-center items-center gap-2">
                <Loader2 className="text-primary animate-spin" />
                <span>Carregando produtos...</span>
              </Row>
            </Show>
          </div>
        </Show>
      </div>
      <Row className="border-t h-14 md:pr-3">
        <ProductsTablePagination totalPages={data?.totalPages ?? 0} />
      </Row>
      <ConfirmDeleteProductDialog
        product={productToDelete!}
        open={openConfirmDeleteDialog}
        onOpenChange={setOpenConfirmDeleteDialog}
        onDeleteSuccess={() => {
          if (products.length <= 1 && page > 1) setPage(page - 1);
        }}
      />
      <ProductDetailsDialog
        product={productToView!}
        open={openProductDetailsDialog}
        onOpenChange={setOpenProductDetailsDialog}
      />
    </Column>
  );
};

export default ProductsTable;
