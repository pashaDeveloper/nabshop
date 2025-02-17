

"use client";

import React, { useEffect, useMemo } from "react";
import Card from "../shared/Card";
import {
  useGetFilteredProductsMutation,
} from "@/services/product/productApi";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import {  setCategory,setPriceRange  } from "@/features/filter/filterSlice";

const FilteredProducts = () => {
  const filter = useSelector((state) => state.filter);
  const [
    addFilter,
    { data: productsData, error: productsError, isLoading: productsLoading },
  ] = useGetFilteredProductsMutation();
  const products = useMemo(() => productsData?.data || [], [productsData]);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const price = searchParams.get("price");

  useEffect(() => {
    addFilter(new URLSearchParams(filter).toString());
  }, [filter, addFilter]);

  useEffect(() => {
    if (productsLoading) {
      toast.loading("Loading...", {
        id: "filtered-products",
      });
    }

    if (productsData) {
      toast.success(productsData?.description, {
        id: "filtered-products",
      });
    }

    if (productsError?.data) {
      toast.error(productsError?.data?.description, {
        id: "filtered-products",
      });
    }

    if (category) dispatch(setCategory(category));
    if (price) dispatch(setPrice(price));

  }, [
    productsError,
    productsData,
    productsLoading,
    category,
    price,
    dispatch,
  ]);

  return (
    <div className="lg:col-span-9 md:col-span-8 col-span-12 mt-24">
      <div className="flex flex-col gap-y-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
          {productsLoading ||!productsLoading && products?.length === 0? (
            <>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {products.map((product, index) => (
                <Card key={index} product={product} />
              ))}
            </>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default FilteredProducts;
