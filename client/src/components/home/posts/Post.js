// import Image from "next/image";
import Container from "@/components/shared/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import Posts from "./Posts";

const Post = () => {
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
              <HighlightText title={"پست های جدید ما"} center />
            </h1>
            <p className="text-base">
              پست‌های ما شامل جدیدترین اطلاعات و تغییرات در دنیای نقل و حلوا
              هستند که می‌توانند به شما در انتخاب و تهیه بهترین محصولات برای هر
              مناسبت کمک کنند.
            </p>
          </article>
          <div>
            <Posts />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Post;
