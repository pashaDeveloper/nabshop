"use client"
import React, { useMemo } from "react";
import { useGetBlogsQuery } from "@/services/blog/blogApi";
import SkeletonText from "@/components/shared/skeletonLoading/SkeletonText";
import SkeletonImage from "@/components/shared/skeletonLoading/SkeletonImage";
import BlogCard from "@/components/shared/card/BlogCard";

const Blogs = () => {
  const { isLoading, data } = useGetBlogsQuery();
  const blogs = useMemo(() => data?.data || [], [data]);
  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2  lg:grid-cols-2 ">
        {isLoading || blogs.length === 0
          ? Array.from({ length: 4 }, (_, index) => (
            <BlogCard key={index}  />
            ))
          : blogs.map((blog, index) => <BlogCard key={index} blog={blog} isLoading={isLoading} />
          
          )}
      </section>
    </>
  );
};

export default Blogs;
