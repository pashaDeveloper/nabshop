"use client";

import PostHeader from "@/components/details/post/PostHeader";
import PostContent from "@/components/details/post/PostContent";
import PostMedia from "@/components/details/post/PostMedia";
import PostComments from "@/components/details/post/PostComments";
import Container from "@/components/shared/Container";
import Main from "@/components/shared/layouts/Main";
import { useGetPostQuery } from "@/services/post/postApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import HighlightText from "@/components/shared/highlightText/HighlightText";

const Detail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("post_id");
  const {
    data: postData,
    error: postError,
    isLoading: postLoading
  } = useGetPostQuery(id);
  const post = useMemo(() => postData?.data || {}, [postData]);
  useEffect(() => {
    if (postError) {
      toast.error(postError?.data?.description, { id: "postData" });
    }
  }, [postError]);
  return (
    <Main>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5 md:mt-28  ">
          <div className="md:col-span-2 flex flex-col gap-y-80 col-span-1 order-2  md:order-1">
            <div>
              <HighlightText title={"مکان تبلیغات شما"} size="2" />
            </div>
            <div>
            <HighlightText title={"مکان تبلیغات شما"} size="2" />
            </div>
          </div>
          <div className="relative md:col-span-7 order-1 md:order-2 bg-white -24 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg">
            <PostHeader
              isLoading={postLoading}
              creator={post?.creator}
              publishDate={post?.publishDate}
            />
            <PostMedia isLoading={postLoading} galleryPreview={post?.gallery} />
            <PostContent
              content={post?.content}
              isLoading={postLoading}
              title={post?.title}
              selectedTags={post?.Tags}
            />
            <PostComments comments={post?.comments} />
          </div>
          <did className="md:col-span-3 order-3 md:order-3 ">
          <div>
              <HighlightText title={"آخرین اخبار  نقل و شیرینی"} size="2" />
            </div>
          </did>
        </div>
      </Container>
    </Main>
  );
};

export default Detail;
