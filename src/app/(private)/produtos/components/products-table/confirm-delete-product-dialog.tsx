"use client";

import { deleteProduct } from "@/src/app/(private)/produtos/services/delete-product";
import { Button } from "@/src/components/core/button";

import Column from "@/src/components/core/column";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/core/dialog";
import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, X } from "lucide-react";
import { toast } from "sonner";

interface ConfirmDeleteProductDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product: { productId: string; productName: string } | null;
}

const ConfirmDeleteProductDialog = ({
  open,
  onOpenChange,
  product,
}: ConfirmDeleteProductDialogProps) => {
  const { mutate: del, isPending: pendingDeleteProduct } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["product", "summaries"],
      });
      toast.success("Produto deletado com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600 !text-white",
      });
    },
  });

  const handleConfirmDelete = () => {
    del({ productId: product?.productId! });
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col items-center"
      >
        <DialogHeader className="items-center gap-4">
          <Flex className="w-12 h-12 rounded-full bg-red-200 items-center justify-center border border-red-600 shrink-0 shadow-md">
            <X className="text-red-600" />
          </Flex>
          <Column className="items-center gap-2">
            <DialogTitle>Excluir Produto</DialogTitle>
            <span className="text-xs text-muted-foreground text-center truncate max-w-xs">
              {product?.productName}
            </span>
          </Column>
        </DialogHeader>
        <DialogDescription className="text-center text-base">
          Você tem certeza que deseja excluir este produto? Esta ação não pode
          ser desfeita.
        </DialogDescription>
        <DialogFooter className="w-full items-center">
          <Button
            variant="outline"
            className="flex-1 w-full border-zinc-300 bg-muted hover:border-foreground! text-foreground! hover:ring-0"
            onClick={() => onOpenChange?.(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="flex-1 w-full"
            onClick={handleConfirmDelete}
          >
            <Show when={pendingDeleteProduct} fallback="Excluir">
              <Loader2Icon className="animate-spin" />
            </Show>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteProductDialog;
