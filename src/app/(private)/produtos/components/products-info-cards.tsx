"use client";

import { pluralize } from "@/src/helpers/pluralize";
import { useQuery } from "@tanstack/react-query";
import { Package, Tag } from "lucide-react";
import { getProductSummaries } from "../services/get-summary-products";
import InfoCard from "./info-card";

const ProductInfoCards = () => {
  const { data: summary, isPending: pendingProductSummaries } = useQuery({
    queryFn: getProductSummaries,
    queryKey: ["product", "summaries"],
  });

  const infoCards = [
    {
      id: 1,
      title: pluralize(
        summary?.registeredProducts || 0,
        "Produto Cadastrado",
        "Produtos Cadastrados",
      ),
      value: summary?.registeredProducts || 0,
      icon: (
        <Package className="w-12 h-12 p-2.5 text-primary bg-primary/20 rounded-md" />
      ),
    },
    {
      id: 2,
      title: pluralize(
        summary?.precifiedProducts || 0,
        "Produto Precificado",
        "Produtos Precificados",
      ),
      value: summary?.precifiedProducts || 0,
      icon: (
        <Tag className="w-12 h-12 p-2.5 text-secondary bg-secondary/20 rounded-md" />
      ),
    },
    // {
    //   id: 3,
    //   title: pluralize(
    //     summary?.activeProducts || 0,
    //     "Produto Ativo",
    //     "Produtos Ativos",
    //   ),
    //   value: summary?.activeProducts || 0,
    //   icon: (
    //     <CheckCircle className="w-12 h-12 p-2.5 text-green-600 bg-green-100 rounded-md" />
    //   ),
    // },
    // {
    //   id: 4,
    //   title: pluralize(
    //     summary?.inactiveProducts || 0,
    //     "Produto Inativo",
    //     "Produtos Inativos",
    //   ),
    //   value: summary?.inactiveProducts || 0,
    //   icon: (
    //     <XCircle className="w-12 h-12 p-2.5 text-red-600 bg-red-100 rounded-md" />
    //   ),
    // },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  w-full gap-4">
      {infoCards.map((card) => (
        <InfoCard
          key={card.id}
          title={card.title}
          value={card.value}
          icon={card.icon}
          pending={pendingProductSummaries}
        />
      ))}
    </div>
  );
};

export default ProductInfoCards;
