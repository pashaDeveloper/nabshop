import React from "react";
import SkeletonText from "@/components/shared/skeletonLoading/SkeletonText";
import SkeletonImage from "@/components/shared/skeletonLoading/SkeletonImage";

const BlogCardSkeleton = () => {
  return (
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white dark:bg-darkCard border dark:border-gray-800 shadow-lg h-[550px] p-4">
      {/* تصویر اسکلتون */}
      <div className="w-full h-60 rounded-xl bg-gray-300 dark:bg-gray-700 animate-pulse">
        <SkeletonImage width={1150} height={500} borderRadius="rounded-xl" />
      </div>

      <div className="px-2 py-4 flex flex-col gap-y-2">
        {/* عنوان */}
        <SkeletonText lines={1} />

        {/* توضیحات */}
        <SkeletonText lines={4}  />

        {/* نویسنده و تاریخ */}
        <div className="flex items-center justify-between mt-4">
          <SkeletonText lines={1} className="w-1/3 h-4" />
          <div className="w-9 h-9 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
