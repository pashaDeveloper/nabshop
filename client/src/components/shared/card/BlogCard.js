const BlogCard = ({ blog = {}, isLoading }) => {
  const router = useRouter();

  if (!blog._id) {
    return <div className="text-red-500">اطلاعات بلاگ موجود نیست.</div>;
  }

  const creator = blog?.creator || {};
  const thumbnail = blog?.thumbnail?.url || "/placeholder.png";

  return (
    <div
      onClick={() =>
        router.push(
          `/blog?blog_id=${blog?._id}&blog_title=${blog?.title?.replace(/ /g, "-").toLowerCase()}`
        )
      }
      className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white dark:bg-darkCard border dark:border-gray-800 bg-clip-border shadow-lg h-[550px] hover:border-primary cursor-pointer dark:hover:border-blue-500"
    >
      {/* تصویر بلاگ */}
      <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        {!blog?.thumbnail && <SkeletonImage width={1150} height={500} borderRadius="rounded-xl" />}
        <Image
          src={thumbnail}
          alt="Blog Image"
          width={1150}
          height={500}
          className="w-full h-64 object-cover object-center rounded-xl"
        />
      </div>

      {/* محتوا */}
      <div className="px-6 py-2">
        <h5 className="text-md tracking-normal dark:text-blue-100 min-w-[80%]">
          {blog?.title || <SkeletonText lines={1} />}
        </h5>
        <p className="text-gray-700 dark:text-blue-100 line-clamp-4 overflow-hidden text-ellipsis break-words">
          {blog?.description || <SkeletonText lines={5} />}
        </p>

        {/* نویسنده */}
        <div className="flex items-center mt-3">
          {isLoading || !creator?._id ? (
            <SkeletonImage height={30} width={30} borderRadius="rounded-full" />
          ) : (
            <Image
              alt={creator?.name || "نویسنده ناشناس"}
              title={creator?.name || "نویسنده ناشناس"}
              src={creator?.avatar?.url || "/placeholder-avatar.png"}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
