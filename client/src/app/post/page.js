

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

const Detail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("post_id");
  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
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
      <div className="relative bg-white mt-24 dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-lg">
      <PostHeader
        isLoading={postLoading}
      creator={post?.creator}
        publishDate={post?.publishDate}
      />
      <PostMedia isLoading={postLoading} galleryPreview={post?.gallery} />
      <PostContent content={post?.content} isLoading={postLoading} title={post?.title } selectedTags={post?.Tags} />
      <PostComments comments={post?.comments} />
    </div>
      </Container>
    </Main>
  );
};

export default Detail;
