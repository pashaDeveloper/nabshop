import React ,{useEffect ,useMemo} from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import { toast } from "react-hot-toast";

const Category = ({ register, errors, prevStep, nextStep }) => {
  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError,
  } = useGetCategoriesQuery();

  const categories = useMemo(
    () => fetchCategoriesData?.data || [],
    [fetchCategoriesData]
  );
  useEffect(() => {
  
    if (fetchingCategories) {
      toast.loading("در حال دریافت دسته بندی ...", { id: "fetchCategories" });
    }

    if (fetchCategoriesData) {
      toast.success(fetchCategoriesData?.description, {
        id: "fetchCategories",
      });
    }

    if (fetchCategoriesError) {
      toast.error(fetchCategoriesError?.data?.description, {
        id: "fetchCategories",
      });
    }
  }, [

    fetchingCategories,
    fetchCategoriesData,
    fetchCategoriesError,
  ]);

  return (
    <>
        <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
          {/* category */}
          <label htmlFor="category" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">دسته بندی*</span>
            {fetchingCategories ? (
              <p className="text-sm">در حال دریافت ...</p>
            ) : (
              <select
                name="category"
                id="category"
                {...register("category", {
                  required: "وارد کردن عنوان الزامی است",
                  minLength: {
                    value: 3,
                    message: "عنوان باید حداقل ۳ حرف داشته باشد",
                  },
                  maxLength: {
                    value: 30,
                    message: "عنوان نباید بیشتر از ۳۰ حرف باشد",
                  },
                })}
                className="w-full"
                required
              >
               
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            )}
             {errors.category && (
          <span className="text-red-500 text-sm">{errors.category.message}</span>
        )}
          </label>
         
        
        </div>

      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Category;
