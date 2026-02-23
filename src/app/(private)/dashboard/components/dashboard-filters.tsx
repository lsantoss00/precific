"use client";

import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { getProducts } from "@/src/app/(private)/produtos/services/get-products";
import { Button } from "@/src/components/core/button";
import Column from "@/src/components/core/column";
import DatePicker from "@/src/components/core/date-picker";
import Flex from "@/src/components/core/flex";
import { Label } from "@/src/components/core/label";
import {
  MultiSelect,
  MultiSelectOption,
  MultiSelectRef,
} from "@/src/components/core/multi-select";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface DashboardFiltersProps {
  value: ChartFiltersType;
  onChange: (filters: ChartFiltersType) => void;
}

const DashboardFilters = ({ value, onChange }: DashboardFiltersProps) => {
  const maxIsXs = useMediaQuery("(max-width: 480px)");
  const maxIsSm = useMediaQuery("(max-width: 640px)");
  const maxIsMd = useMediaQuery("(max-width: 768px)");
  const minIsXl = useMediaQuery("(min-width: 1280px)");
  const minIs2Xl = useMediaQuery("(min-width: 1536px)");

  const { fromDate: dateFrom, toDate: dateTo, productIds: products } = value;

  const multiSelectRef = useRef<MultiSelectRef>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    string[] | undefined
  >(undefined);
  const [selectedFromDate, setSelectedFromDate] = useState<Date | undefined>(
    dateFrom,
  );
  const [selectedToDate, setSelectedToDate] = useState<Date | undefined>(
    dateTo,
  );
  const [selectedProductsMap, setSelectedProductsMap] = useState<
    Map<string, string>
  >(new Map());

  const debouncedSearched = useDebounce(searchTerm);
  const debouncedProducts = useDebounce(selectedProducts, 500);
  const debouncedFromDate = useDebounce(selectedFromDate, 500);
  const debouncedToDate = useDebounce(selectedToDate, 500);

  const isDebouncing = searchTerm !== debouncedSearched;

  const handleStartDateChange = (dateFrom?: Date) => {
    setSelectedFromDate(dateFrom);
  };

  const handleEndDateChange = (dateTo?: Date) => {
    setSelectedToDate(dateTo);
  };

  const handleProductsChange = (products: string[] | undefined) => {
    setSelectedProducts(products);
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["products", debouncedSearched],
    queryFn: ({ pageParam = 1 }) =>
      getProducts({
        page: pageParam,
        pageSize: 10,
        search: debouncedSearched,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
    initialPageParam: 1,
  });

  const fetchedOptions = useMemo<MultiSelectOption[]>(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page) =>
      page.data.map((product) => ({
        label: product.name,
        value: product.id,
      })),
    );
  }, [data]);

  const options = useMemo<MultiSelectOption[]>(() => {
    const map = new Map<string, MultiSelectOption>();

    fetchedOptions.forEach((option) => map.set(option.value, option));

    selectedProductsMap.forEach((label, id) => {
      if (!map.has(id)) {
        map.set(id, { label, value: id });
      }
    });

    return Array.from(map.values());
  }, [fetchedOptions, selectedProductsMap]);

  useMemo(() => {
    const newMap = new Map(selectedProductsMap);
    let hasChanges = false;

    fetchedOptions.forEach((option) => {
      if (
        selectedProducts?.includes(option.value) &&
        !newMap.has(option.value)
      ) {
        newMap.set(option.value, option.label);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setSelectedProductsMap(newMap);
    }
  }, [fetchedOptions, selectedProducts]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const multiSelectMaxCount = maxIsXs
    ? 1
    : maxIsSm
      ? 2
      : maxIsMd
        ? 1
        : minIs2Xl
          ? 2
          : minIsXl
            ? 3
            : 2;

  const hasActiveFilters =
    selectedFromDate !== undefined ||
    selectedToDate !== undefined ||
    (selectedProducts !== undefined && selectedProducts.length > 0);

  const handleClearFilters = () => {
    setSelectedProducts(undefined);
    setSelectedFromDate(undefined);
    setSelectedToDate(undefined);
    setSearchTerm("");
    multiSelectRef.current?.clear();

    onChange({
      fromDate: undefined,
      toDate: undefined,
      productIds: undefined,
    });
  };

  useEffect(() => {
    if (products) {
      setSelectedProducts(products);
    }
  }, [products]);

  useEffect(() => {
    setSelectedFromDate(dateFrom);
  }, [dateFrom]);

  useEffect(() => {
    setSelectedToDate(dateTo);
  }, [dateTo]);

  useEffect(() => {
    if (JSON.stringify(debouncedProducts) !== JSON.stringify(products)) {
      onChange({ ...value, productIds: debouncedProducts });
    }
  }, [debouncedProducts]);

  useEffect(() => {
    if (debouncedFromDate) {
      const startOfDay = new Date(debouncedFromDate);
      startOfDay.setHours(0, 0, 0, 0);

      if (!dateFrom || startOfDay.getTime() !== dateFrom.getTime()) {
        onChange({ ...value, fromDate: startOfDay });
      }
    } else if (debouncedFromDate !== dateFrom) {
      onChange({ ...value, fromDate: debouncedFromDate });
    }
  }, [debouncedFromDate]);

  useEffect(() => {
    if (debouncedToDate) {
      const endOfDay = new Date(debouncedToDate);
      endOfDay.setHours(23, 59, 59, 999);

      if (!dateTo || endOfDay.getTime() !== dateTo.getTime()) {
        onChange({ ...value, toDate: endOfDay });
      }
    } else if (debouncedToDate !== dateTo) {
      onChange({ ...value, toDate: debouncedToDate });
    }
  }, [debouncedToDate]);

  return (
    <Flex className="flex-col gap-4 2xl:flex-row">
      <Flex className="flex-col sm:flex-row gap-4 items-center">
        <Flex className="flex-col sm:flex-row w-full 2xl:w-fit gap-4">
          <Column className="gap-2 w-full 2xl:w-39.5">
            <Label>De:</Label>
            <DatePicker
              value={selectedFromDate}
              onValueChange={handleStartDateChange}
            />
          </Column>
          <Column className="gap-2 w-full 2xl:w-39.5">
            <Label>Até:</Label>
            <DatePicker
              value={selectedToDate}
              onValueChange={handleEndDateChange}
            />
          </Column>
        </Flex>
        <Column className="gap-2 w-full 2xl:w-83.5">
          <Label>Produtos:</Label>
          <MultiSelect
            ref={multiSelectRef}
            options={options}
            value={selectedProducts}
            onValueChange={handleProductsChange}
            commandInputPlaceholder="Busque produtos..."
            maxCount={multiSelectMaxCount}
            className="w-full 2xl:max-w-90.5!"
            onScrollEnd={handleLoadMore}
            isLoadingMore={isFetching || isDebouncing}
            onSearch={setSearchTerm}
            onSearchValue={searchTerm}
          />
        </Column>
      </Flex>
      <Show when={hasActiveFilters}>
        <Button
          className="text-primary p-0 self-start 2xl:self-center 2xl:mt-5"
          variant="link"
          onClick={handleClearFilters}
        >
          <Row className="items-center gap-2">
            <SearchX />
            <span>Limpar filtros</span>
          </Row>
        </Button>
      </Show>
    </Flex>
  );
};

export default DashboardFilters;
