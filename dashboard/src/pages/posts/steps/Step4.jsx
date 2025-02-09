// Step3.js
import React ,{useMemo ,useEffect }  from 'react';
import { Controller } from "react-hook-form";
import  Plus  from '@/components/icons/Plus';
import  Tag  from '@/components/icons/Tag';
import MultiSelect from "@/components/shared/dropdown/MultiSelect";
import Dropdown from "@/components/shared/dropdown/Dropdown";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { toast } from "react-hot-toast";
const Step4 = ({
  tagsOptions,
  categoryOptions,
  errors,
  selectedTags,
  selectedCategory,
   nextStep, prevStep,
}) => {
  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError,
  } = useGetTagsQuery();
  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError,
  } = useGetCategoriesQuery();
  const tags = useMemo(
    () =>
      fetchTagsData?.data?.map((tag) => ({
        id: tag._id,
        value: tag.title, 
        label: tag.title, 
        description: tag.description, 
      })) || [],
    [fetchTagsData]
  );
  const categories = useMemo(
    () =>
      fetchCategoriesData?.data?.map((category) => ({
        id: category._id,
        value: category.title, 
        label: category.title, 
        description: category.description, 
      })) || [],
    [fetchCategoriesData]
  );
  const handleOptionsChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };

  useEffect(() => {
    if (fetchingTags) {
      toast.loading("در حال دریافت دسته بندی ...", { id: "fetchTags" });
    }

    if (fetchTagsData) {
      toast.success(fetchTagsData?.description, {
        id: "fetchTags",
      });
    }

    if (fetchTagsError) {
      toast.error(fetchTagsError?.data?.description, {
        id: "fetchTags",
      });
    }
  }, [fetchingTags, fetchTagsData, fetchTagsError]);


  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 gap-y-4 w-full">
        {/* بخش تگ‌ها */}
        <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
            <label htmlFor="tag" className="w-full flex flex-col gap-y-1">
          <span className="text-sm">برچسب*</span>
          <MultiSelect
            items={tags}
            selectedItems={selectedTags}
            handleSelect={handleOptionsChange}
            className="w-full"
            name="tags"
            icon={<Tag size={24} />}
          />
        </label>
            </div>
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
           
                aria-label="افزودن تگ جدید"
              >
                <Plus />
              </button>
            </div>
          </div>
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
        </div>

        {/* بخش دسته‌بندی */}
        <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="category" className="flex flex-col gap-y-2">
                دسته‌بندی
                <Dropdown
                    items={categories}
                      sendId={true}
                      errors={errors.category}
                      className={"w-full h-12"}
                    />
              </label>
            </div>
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن دسته‌بندی جدید"
              >
                <Plus />
              </button>
            </div>
          </div>
          {errors.category && (
            <span className="text-red-500 text-sm">{errors.category.message}</span>
          )}
        </div>

      
      </div>
      <div className="flex justify-between mt-12 right-0 absolute bottom-2 w-full px-8">         <NavigationButton direction="next" onClick={nextStep} />         <NavigationButton direction="prev" onClick={prevStep} />       </div>
    </>
  );
};

export default Step4;
