"use client";

import { Button } from "@/src/components/core/button";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { ScrollText, Tag } from "lucide-react";
import { useProductForm } from "../contexts/product-form-context";
import ProductForm from "./product-form";
import ProductPriceHistoryDialog from "./product-price-history-dialog";

const ProductFormPageContent = () => {
  const { isEditMode, productId } = useProductForm();
  return (
    <Container variant="page">
      <Flex className="flex-col md:flex-row gap-2 justify-between md:items-center">
        <Row className="items-center gap-2">
          <Tag size={26} />
          <h1 className="text-3xl font-semibold">Precificar</h1>
        </Row>
        <Show when={isEditMode}>
          <ProductPriceHistoryDialog
            productId={productId!}
            trigger={
              <Button className="cursor-pointer h-12" variant="secondary">
                <ScrollText className="w-5! h-5!" />
                <span>Histórico de Preço</span>
              </Button>
            }
          />
        </Show>
      </Flex>
      <ProductForm productId={productId} />
    </Container>
  );
};

export default ProductFormPageContent;
