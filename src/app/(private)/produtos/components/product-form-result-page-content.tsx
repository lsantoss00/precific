"use client";

import { Container } from "@/src/components/core/container";
import Row from "@/src/components/core/row";
import { NotepadText } from "lucide-react";
import ProductResult from "./product-result";

const ProductFormResultPageContent = () => {
  return (
    <Container variant="page">
      <Row className="items-center gap-2">
        <NotepadText size={26} />
        <h1 className="text-3xl font-semibold">Resultado</h1>
      </Row>
      <ProductResult />
    </Container>
  );
};

export default ProductFormResultPageContent;
