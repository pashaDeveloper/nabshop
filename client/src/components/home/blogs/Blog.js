// import Image from "next/image";
"use client"
import Container from "@/components/shared/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React, { useMemo } from "react";
import { useGetBlogsQuery } from "@/services/blog/blogApi";
import BlogCard from "@/components/shared/card/BlogCard";

const Blog = () => {
  const { isLoading, data } = useGetBlogsQuery();
const blogs = useMemo(() => data?.data || [], [data]);
  return (
    <section
      className="bg-no-repeat bg-contain bg-center h-full py-12 "
      style={{
        backgroundImage:
          "url(/assets/home/main/tree1.svg), url(/assets/home/main/tree2.svg)",
        backgroundPosition: "0% 0%, 100% 100%",
        backgroundSize: "251px 300px, 251px 300px"
      }}
    >
      <Container>
        <div className="w-full h-full flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <h1 className="text-4xl w-fit">
              <HighlightText title={"از ما بخوانید"} center />
            </h1>
            <p className="text-base">
              مجله های ما شامل جدیدترین اطلاعات و تغییرات در دنیای نقل و حلوا
              هستند که می‌توانند به شما در انتخاب و تهیه بهترین محصولات برای هر
              مناسبت کمک کنند.
            </p>
          </article>
          <div>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2  lg:grid-cols-3 ">
        {isLoading || blogs.length === 0
          ? Array.from({ length: 4 }, (_, index) => (
            <BlogCard key={index}  />
            ))
          : blogs.map((blog, index) => <BlogCard key={index} blog={blog} isLoading={isLoading} />
          
          )}
      </section>          </div>
        </div>
      </Container>
    </section>
  );
};

export default Blog;
