import React from "react";
import SkeletonText from "@/components/shared/skeletonLoading/SkeletonText";
import SkeletonImage from "@/components/shared/skeletonLoading/SkeletonImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai";
const PostCard = ({ post }) => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(
          `/post?post_id=${post?._id}&post_title=${post?.title
            .replace(/ /g, "-")
            .toLowerCase()}`
        )
      }
      className="flex flex-col justify-center rtl dark:text-white w-full cursor-pointer"
    >
      <div className="relative transition-color ease-linear delay-100 hover:border-primary dark:hover:border-primary flex sm:flex-row min-h-[140px] lg:min-h-[220px] h-[130px] lg:h-[220px] rounded-primary shadow-lg w-full max-w-[650px] mx-auto p-3 border dark:border-gray-700 dark:bg-gray-800/70 bg-white/80">
        <div className="w-1/3 grid place-items-center">
          {!post?.thumbnail ? (
            <SkeletonImage borderRadius="rounded-xl" />
          ) : (
            <Image
              src={post?.thumbnail?.url}
              alt="Feature Preview"
              width={500} // عرض مورد نظر را وارد کنید
              height={500} // ارتفاع مورد نظر را وارد کنید
              className="w-full h-full object-cover rounded-xl"
            />
          )}
        </div>
        <div className="w-2/3 space-y-2 px-2 flex flex-col">
          <div className="lg:flex justify-between items-center hidden gap-2">
            {!post?.category ? (
              <SkeletonText lines={1} />
            ) : (
              <>
                <div className="flex w-full items-center justify-between">
                  <p className="text-gray-500 font-medium">
                    {post?.category?.title}
                  </p>
                  <div className="flex">
                    <span className="text-xs flex items-center gap-x-1 px-2 h-full bg-zinc-50 rounded">
                      <AiFillStar className="w-4 h-4 text-yellow-500" />
                    </span>
                    <p className="text-gray-600 text-sm mr-1">
                      4.96 <span className="text-gray-500"> (76 نظر)</span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <h3 className="text-gray-800 line-clamp-1 dark:text-gray-100 m-0 text-sm md:text-lg">
            {!post?.title ? <SkeletonText lines={1} /> : post?.title}
          </h3>
          <p className="text-xs line-clamp-3 lg:line-clamp-4 lg:text-sm text-justify text-gray-500">
            {!post?.description ? (
              <SkeletonText lines={3} />
            ) : (
              post?.description
            )}
          </p>

          <div className="absolute bottom-2 w-2/3 text-xs lg:text-lg flex justify-between items-end">
            <div>
              {new Date(post?.publishDate).toLocaleDateString("fa-IR", {
                weekday: "long"
              })}{" "}
              - {new Date(post?.publishDate).toLocaleDateString("fa-IR")}
            </div>
            <div className="ml-7">
              {!post?.creator?.avatar && (
                <div className="dark:!border-gray-600 text-center rounded-full flex justify-center">
                  <SkeletonImage
                    height={30}
                    width={30}
                    showSize={false}
                    borderRadius="rounded-full lg:!w-7 lg:!h-7"
                  />
                </div>
              )}

              {post?.creator?.avatar && (
                <div className="text-center rounded-full flex justify-center">
                  <Image
                    src={post?.creator?.avatar?.url}
                    alt="avatar"
                    height={300}
                    width={300}
                    className="lg:!h-9 lg:!w-9 h-7 w-7 rounded-full text-center"
                  />
                  {/* {post?.creator !== superAdmin?.name && superAdmin?.avatar && (
      <Image
        alt={superAdmin?.name}
        title={superAdmin?.name}
        src={superAdmin?.avatar}
        height={36} // تنظیم ارتفاع
        width={36}  // تنظیم عرض
        className="inline-block h-9 w-9 rounded-full   object-cover object-center hover:z-10"
      />
    )} */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
