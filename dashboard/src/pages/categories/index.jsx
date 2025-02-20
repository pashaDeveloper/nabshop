import React, { useEffect, useMemo, useState } from "react";
import ControlPanel from "../ControlPanel";
import AddButton from "@/components/shared/button/AddButton";
import { setCategories } from "@/features/category/categorySlice";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery
} from "@/services/category/categoryApi";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Trash from "@/components/icons/Trash";
import Edit from "@/components/icons/Edit";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import DeleteModal from "@/components/shared/modal/DeleteModal";
function Categories() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
    refetch: categoryRefetch
  } = useGetCategoriesQuery();
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoriesLoading) {
      toast.loading("Fetching Categories...", { id: "categoriesData" });
    }

    if (categoriesData) {
      toast.success(categoriesData?.description, { id: "categoriesData" });
    }

    if (categoriesError) {
      toast.error(categoriesError?.data?.description, { id: "categoriesData" });
    }

    dispatch(setCategories(categories));
  }, [
    categoriesError,
    categoriesData,
    categoriesLoading,
    dispatch,
    categories
  ]);
  const [deleteCategory, { isLoading, data, error }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting Category...", { id: "deleteCategory" });
    }

    if (data) {
      toast.success(data?.description, { id: "deleteCategory" });
      setIsDeleteModalOpen(false);
    }

    if (error) {
      toast.error(error?.data?.description, { id: "deleteCategory" });
    }
  }, [isLoading, data, error]);

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedCategory(null);
    setIsDeleteModalOpen(false);
  };
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedCategory(null);
    setIsEditModalOpen(false);
  };
  return (
    <ControlPanel>
      <AddButton link="./add" />
      {categoriesLoading || categories?.length === 0 ? (
        <SkeletonItem repeat={5} />
      ) : (
        <section className="w-full h-full">
          <div className="overflow-x-auto w-full">
            <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
              <div className="col-span-11 lg:col-span-3  text-sm">
                <span className="hidden lg:flex">عنوان</span>
                <span className="flex lg:hidden"> عنوان و توضیحات</span>
              </div>

              <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
                توضیحات
              </div>

              <div className="lg:col-span-2 lg:flex hidden text-sm md:block">
                برچسب
              </div>
              <div className="lg:col-span-2 lg:flex hidden text-sm md:block">
                نکته کلیدی
              </div>

              <div className="col-span-1 md:block text-sm">عملیات</div>
            </div>

            {categories.map((category) => (
              <div
                key={category?._id}
                className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                  <StatusIndicator isActive={category.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    <img
                      src={
                        category?.thumbnail?.url ||
                        category?.creator?.avatar?.url
                      }
                      alt={``}
                      height={100}
                      width={100}
                      className="h-[60px] w-[60px] rounded-full object-cover"
                    />
                    <article className="flex-col flex gap-y-2  ">
                      <span className="line-clamp-1 text-base ">
                        <span className="flex ">{category?.title}</span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(category.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                      <span className=" lg:hidden text-xs  line-clamp-1">
                        {category?.description
                          ? category?.description
                          : new Date(category.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                      </span>
                    </article>
                  </div>
                </div>

                <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right overflow-hidden">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                      {category.description}
                    </span>
                  </article>
                </div>

                <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                  <span className="w-52 overflow-x-auto scrollbar-hide text-sm flex flex-row gap-x-2">
                    {category.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="border px-1 py-0.5 rounded-sm whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                  <span className="w-52 overflow-x-auto scrollbar-hide text-sm flex flex-row gap-x-2">
                    {category?.keynotes?.length > 0 &&
                      category?.keynotes?.map((keynote, index) => (
                        <span
                          key={index}
                          className="border px-1 py-0.5 rounded-sm whitespace-nowrap"
                        >
                          {keynote}
                        </span>
                      ))}
                  </span>
                </div>
                <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                  <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                    <span
                      className="edit-button "
                      onClick={() => openEditModal(category)}
                    >
                      <Edit className="w-5 h-5" />
                    </span>
                    <span
                      className="delete-button"
                      onClick={() => openDeleteModal(category)}
                    >
                      <Trash className="w-5 h-5" />
                    </span>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onDelete={() => deleteCategory(selectedCategory?._id)}
          onClose={closeDeleteModal}
          message={`آیا مطمئن هستید که می‌خواهید دسته‌بندی "${selectedCategory?.title}" را حذف کنید؟`}
        />
      )}
    </ControlPanel>
  );
}

export default Categories;
