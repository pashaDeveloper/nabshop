
"use client"
import Container from "@/components/shared/Container";
import Main from "@/components/shared/layouts/Main";
import { useGetBlogQuery } from "@/services/blog/blogApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import BlogsContent from "@/components/details/blog/BlogContent";

const Detail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("blog_id");
  const {
    data: blogData,
    error: blogError,
    isLoading: blogLoading
  } = useGetBlogQuery(id);
  const blog = useMemo(() => blogData?.data || {}, [blogData]);
  useEffect(() => {
    if (blogError) {
      toast.error(blogError?.data?.description, { id: "blogData" });
    }
  }, [blogError]);
  return (
    <Main>
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4   ">
          <div className="md:col-span-2 pr-2 flex flex-col gap-y-80 col-span-1 order-2  md:order-1">
          <div className="mt-[520px] w-fit">
              <HighlightText title={"مکان تبلیغات شما"} size="2" />
            </div>
           
          </div>
          <div className="md:col-span-7 order-1 md:order-2 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg">
           <BlogsContent blog={blog} />
          </div>
          <did className="md:col-span-3 order-3 md:order-3 pr-2">
          <div className="mt-[520px] w-fit">
              <HighlightText title={"آخرین اخبار  نقل و شیرینی"} size="2" />
            </div>
          </did>
        </div>
    </Main>
  );
};

export default Detail;
