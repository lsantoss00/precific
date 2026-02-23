import ProductsHeaderSection from "@/src/app/(private)/produtos/components/products-header-section";
import ProductInfoCards from "@/src/app/(private)/produtos/components/products-info-cards";
import ProductsTable from "@/src/app/(private)/produtos/components/products-table";
import { Container } from "@/src/components/core/container";

const ProductsPageContent = () => {
  return (
    <Container variant="page">
      <ProductsHeaderSection />
      <ProductInfoCards />
      <ProductsTable />
    </Container>
  );
};

export default ProductsPageContent;
