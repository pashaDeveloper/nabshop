"use client";
import Trash from "@/components/icons/Trash";
import Dashboard from "@/components/shared/layouts/Dashboard";
import SkeletonItem from "@/components/shared/skeletonLoading/SkeletonItem";
import { useRemoveFromFavoriteMutation } from "@/services/favorite/favoriteApi";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = () => {
  const user = useSelector((state) => state.auth.user);
  const [removeFromFavorite, { isLoading, data, error }] =
    useRemoveFromFavoriteMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال حذف از علاقه‌مندی‌ها...", { id: "removeFromFavorite" });
    }

    if (data) {
      toast.success(data?.description, { id: "removeFromFavorite" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "removeFromFavorite" });
    }
  }, [isLoading, data, error]);

  return (
    <Dashboard>
      {user?.favorites?.length === 0 ? (
        <SkeletonItem repeat={5} />
      ) : (
        <section className="w-full h-full">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap">تصویر</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap">عنوان</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap">قیمت ($)</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap">گالری</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap">سایزها</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap">رنگ‌ها</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap">دسته‌بندی</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap">برند</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap">فروشگاه</th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase whitespace-nowrap">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {user?.favorites?.map(({ product, _id }) => (
                  <tr key={product?._id} className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100">
                    <td className="px-6 py-4">
                      <Image src={product?.thumbnail?.url} alt={product?.thumbnail?.public_id} height={30} width={30} className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover" />
                    </td>
                    <td className="px-6 py-4"><span className="whitespace-nowrap w-60 overflow-x-auto block scrollbar-hide text-sm">{product?.title}</span></td>
                    <td className="px-6 py-4"><span className="whitespace-nowrap scrollbar-hide text-sm">{product?.price}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-4">
                        {product?.gallery.map((thumbnail) => (
                          <Image key={thumbnail?._id} src={thumbnail?.url} alt={thumbnail?.public_id} height={30} width={30} className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover" />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex flex-row gap-x-2 scrollbar-hide text-sm">
                        {product?.variations?.sizes?.map((size) => (
                          <span key={size} className="border px-1 py-0.5">{size.toUpperCase()}</span>
                        ))}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex flex-row gap-x-2 scrollbar-hide text-sm">
                        {product?.variations?.colors?.map((color) => (
                          <span key={color} style={{ backgroundColor: `#${color}`, height: "20px", width: "20px" }} />
                        ))}
                      </span>
                    </td>
                    <td className="px-6 py-4"><span className="whitespace-nowrap scrollbar-hide text-sm">{product?.category?.title}</span></td>
                    <td className="px-6 py-4"><span className="whitespace-nowrap scrollbar-hide text-sm">{product?.brand?.title}</span></td>
                    <td className="px-6 py-4"><span className="whitespace-nowrap scrollbar-hide text-sm">{product?.store?.title}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button type="submit" className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900" onClick={() => removeFromFavorite({ id: _id })}>
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </Dashboard>
  );
};

export default Page;
