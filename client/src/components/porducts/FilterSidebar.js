"use client";

import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import React, { useEffect,useState  } from "react";
import { AiOutlineReload } from "react-icons/ai";
import SelectCard from "../shared/skeletonLoading/SelectCard";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  setCategory,
  setDateRange,
  setPriceRange
} from "@/features/filter/filterSlice";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BiSolidStar } from "react-icons/bi";

const FilterSidebar = () => {
  const [priceRange, setPriceRangeLocal] = useState({ min: 50, max: 5000 });
  const [dateRange, setDateRangeLocal] = useState({
    startDate: null,
    endDate: null,
  });
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading
  } = useGetCategoriesQuery();


  const handlePriceRangeChange = (min, max) => {
    setPriceRangeLocal({ min, max });
    dispatch(setPriceRange({ min, max }));
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRangeLocal({ startDate, endDate });
    dispatch(setDateRange({ startDate, endDate }));
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = useSelector((state) => state.filter);

  const category = searchParams.get("category");

  const categories = categoriesData?.data || [];

  useEffect(() => {


    if (categoriesError?.data) {
      toast.error(categoriesError?.data?.description, {
        id: "categories-data"
      });
    }

  }, [ categoriesError, ]);

  return (
    <aside className="lg:col-span-3 md:col-span-4 mt-24 col-span-12">
      <section className="flex flex-col gap-y-4 md:sticky md:top-4">
        {/* reset */}
        <div className="flex flex-row items-center justify-between border py-2 px-4 rounded">
          <h2 className="text-lg">تنظیم مجدد فیلتر</h2>

          <button
            className="p-1 border rounded-secondary"
            onClick={() => {
              dispatch(clearFilter());

              // Uncheck all checkboxes for categories
              categories.forEach((category) => {
                document.getElementById(category._id).checked = false;
              });

    

      

              // Use setTimeout to delay the navigation
              router.push("/products");
            }}
          >
            <AiOutlineReload className="h-5 w-5" />
          </button>
        </div>

        {/* Choose Category */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl max-h-96 overflow-y-auto scrollbar-hide">
          <h2 className="text-lg">از دسته بندی</h2>
          <div className="flex flex-col gap-y-2.5">
            {categoriesLoading || categories?.length === 0 ? (
              <>
                {[1, 2, 3].map((_, index) => (
                  <SelectCard key={index} />
                ))}
              </>
            ) : (
              <>
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category._id}`}
                  >
                    <label
                      htmlFor={category._id}
                      className="text-sm flex flex-row items-center gap-x-1.5"
                      onChange={() => dispatch(setCategory(category._id))}
                    >
                      <input
                        type="radio"
                        name="category"
                        id={category._id}
                        value={category._id}
                        checked={
                          category._id === filter.category ||
                          category._id === category
                        }
                        className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1 focus:text-black"
                      />
                      {category.title}
                    </label>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
        {/* choose price */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">رنج قیمت </h2>
          <label htmlFor="price" className="flex flex-col gap-y-2">
            <input
              type="range"
              name="price"
              id="price"
              min={50}
              max={5000}
              value={priceRange.min}
              onChange={(e) =>
                handlePriceRangeChange(Number(e.target.value), priceRange.max)
              }
              className="flex-1 bg-green-200 appearance-none h-0 rounded"
            />
            <p className="text-xs flex flex-row items-center justify-between">
              تومان {priceRange.min.toFixed(3)}
              <span className="text-xs"> تومان {priceRange.max.toFixed(3)}</span>
            </p>
          </label>
        </div>
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl">
          <h2 className="text-lg flex items-baseline gap-x-1">
            براساس سایز <span className="!text-xs">(به زودی...)</span>
          </h2>
          <div className="flex flex-col gap-y-2.5">
            <label
              htmlFor="xs"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="xs"
                id="xs"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              نیم کیلوئی
            </label>
            <label
              htmlFor="2xl"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="2xl"
                id="2xl"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              یک کیولئی
            </label>
            <label
              htmlFor="lg"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="lg"
                id="lg"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              دو کیلوئی
            </label>
            <label
              htmlFor="m"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="m"
                id="m"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              نیم لیتری
            </label>
            <label
              htmlFor="m"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="m"
                id="m"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              یک لیتری
            </label>
            <label
              htmlFor="m"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="m"
                id="m"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              یک و نیم لیتری
            </label>
          </div>
        </div>
          {/* Choose Rating */}
          <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl">
          <h2 className="text-lg flex items-baseline gap-x-1">
            براساس امتیاز  <span className="!text-xs">(به زودی...)</span>
          </h2>
          <div className="flex flex-col gap-y-2.5">
            <label
              htmlFor="five"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="five"
                id="five"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              <span className="flex flex-row gap-x-1 items-center">
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
              </span>
            </label>
            <label
              htmlFor="four"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="four"
                id="four"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              <span className="flex flex-row gap-x-1 items-center">
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
              </span>
            </label>
            <label
              htmlFor="three"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="three"
                id="three"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              <span className="flex flex-row gap-x-1 items-center">
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
              </span>
            </label>
            <label
              htmlFor="two"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="two"
                id="two"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              <span className="flex flex-row gap-x-1 items-center">
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
              </span>
            </label>
            <label
              htmlFor="one"
              className="text-sm flex flex-row items-center gap-x-1.5"
            >
              <input
                type="checkbox"
                name="one"
                id="one"
                className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
              />
              <span className="flex flex-row gap-x-1 items-center">
                <BiSolidStar className="text-yellow-500 h-4 w-4" />
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded">
          <h2 className="text-lg">رنج تاریخ</h2>
          <label
            htmlFor="startDate"
            className="flex flex-row gap-x-2 items-center"
          >
            <input
              type="date"
              id="startDate"
              value={dateRange.startDate}
              onChange={(e) =>
                handleDateRangeChange(e.target.value, dateRange.endDate)
              }
              className="flex-1 !text-sm !p-0 !border-0"
            />
            <div className="h-4 border" />
            <input
              type="date"
              id="endDate"
              value={dateRange.endDate}
              onChange={(e) =>
                handleDateRangeChange(dateRange.startDate, e.target.value)
              }
              className="flex-1 !text-sm !p-0 !border-0"
            />
          </label>
        </div>

      
      </section>
    </aside>
  );
};

export default FilterSidebar;
