import React, {  useMemo,useState } from "react";
import { useGetPostsQuery } from "@/services/post/postApi";
import SkeletonText from "@/components/shared/skeletonLoading/SkeletonText";
import SkeletonImage from "@/components/shared/skeletonLoading/SkeletonImage";
import PostCard from "@/components/shared/card/PostCard"; 

const Posts = () => {
  const { isLoading, data } = useGetPostsQuery();
  const posts = useMemo(() => data?.data || [], [data]);
  const superAdmin = useMemo(() => data?.superAdmin || [], [data]);
  return (
    <>
<section className="grid grid-cols-1 gap-4 sm:grid-cols-2  lg:grid-cols-2 ">
{isLoading || posts.length === 0
        ? Array.from({ length: 4 }, (_, index) => (
          <div
          key={index}
          className="flex flex-col justify-center rtl min-h-[120px] lg:min-h-[200px]  dark:text-white"
            >
              <div className="relative flex flex-row space-x-3 h-full space-x-reverse rounded-primary shadow-lg p-3 w-full md:min-w-[600px] max-w-[650px] mx-auto border border-white dark:border-gray-700 dark:bg-gray-800/70 bg-white/70">
                <div className="w-1/3 grid place-items-center ">
                <SkeletonImage borderRadius={"rounded-lg"}  />
                </div>
                <div className="w-2/3 flex flex-col space-y-2  lg:p-3">
                <SkeletonText lines={7} />
               
                </div>
              </div>
            </div>
          ))
          : posts.map((post,index) => (
          <PostCard
          key={index}
          post={post}
          
          />
        ))}
          
    </section>
   
        </>
  );
};

export default Posts;
