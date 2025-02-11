import React, { useEffect, useMemo, useState } from "react";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import { toast } from "react-hot-toast";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import Tag from "@/components/icons/Tag";
// import MultiSelect from "@/components/shared/dropdown/MultiSelect";

const ProductStatus = ({ register, errors, selectedOptions, setSelectedOptions }) => {
  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError,
  } = useGetTagsQuery();

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
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2 p-4 border rounded">
        <label htmlFor="tag" className="w-full flex flex-col gap-y-1">
          <span className="text-sm">برچسب*</span>
          {/* <MultiSelect
            items={tags}
            selectedItems={selectedOptions}
            handleSelect={handleOptionsChange}
            className="w-full"
            name="tags"
            icon={<Tag size={24} />}
          /> */}
        </label>
      </div>
      <StatusSwitch
        label="آیا این محصول ویژه است"
        id="isFeatured"
        register={register}
      />
    </div>
  );
};

export default ProductStatus;
