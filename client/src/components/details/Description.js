import React, { useEffect, useState } from "react";
import DetailCard from "./DetailCard";
import Modal from "../shared/Modal";
import Image from "next/image";
import { useAddReviewMutation } from "@/services/review/reviewApi";
import { toast } from "react-hot-toast";
import Inform from "../icons/Inform";
import { useSelector } from "react-redux";

const Description = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [addReview, { isLoading, data, error }] = useAddReviewMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding Review...", { id: "addReview" });
    }

    if (data) {
      toast.success(data?.description, { id: "addReview" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "addReview" });
    }
  }, [isLoading, data, error]);

  const handleAddReview = (e) => {
    e.preventDefault();

    addReview({
      product: product?._id,
      rating: e.target.rating.value,
      comment: e.target.comment.value
    });

    event.target.reset();
  };
  return (
    <section className="flex flex-col gap-y-2.5">
      <div className="flex flex-row gap-x-2 items-center">
        <span className="whitespace-nowrap text-sm text-black dark:text-gray-100">
          جزئیات این محصول
        </span>
        <hr className="w-full" />
      </div>
      <article className="flex flex-col gap-y-4">
        <p className="text-sm">{product?.summary}</p>
        <button
          className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center dark:text-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          نظرات
        </button>
        <div className="flex flex-row gap-x-2 items-center">
          <span className="whitespace-nowrap text-sm text-black dark:text-gray-100">
            ویزگی های این محصول{" "}
          </span>
          <hr className="w-full" />
        </div>
        <div className="flex flex-col gap-y-4">
          {product?.features?.map((explanation, index) => (
            <DetailCard
              key={index}
              icon={explanation.icon}
              title={explanation?.title}
              content={explanation?.content}
            />
          ))}
        </div>
      </article>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-6 lg:w-1/3 md:w-1/2 w-full h-96 dark:bg-slate-900"
        >
          <section className="h-full flex flex-col gap-y-6">
            <form
              action=""
              className="flex flex-row gap-x-2 items-center"
              onSubmit={handleAddReview}
            >
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="اگر ایده یا نظری دارید خوشحال می شویم با ما در میان بگذارید"
                className="w-full text-sm dark:bg-slate-700"
              />
              <input
                type="number"
                name="rating"
                id="rating"
                min="1"
                max="5"
                placeholder="مقدار"
                className="w-fit text-sm dark:bg-slate-700"
              />
              <input
                type="submit"
                value="ثبت"
                className="text-sm p-2 border dark:border-gray-600 bg-black text-white rounded cursor-pointer"
              />
            </form>

            {product?.reviews?.length === 0 ? (
              <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
                <Inform /> هیچ نظری برای این محصول ثبت نشده!
              </p>
            ) : (
              <div className="h-full overflow-y-auto scrollbar-hide flex flex-col gap-y-4">
                {product?.reviews?.map((review, index) => (
                  <article
                    key={index}
                    className="flex flex-col gap-y-2 p-4 bg-slate-50 rounded"
                  >
                    <div className="flex flex-row gap-x-2">
                      <Image
                        src={review?.reviewer?.avatar?.url}
                        alt={review?.reviewer?.avatar?.public_id}
                        width={40}
                        height={40}
                        className="rounded object-cover h-[40px] w-[40px]"
                      />
                      <div className="flex flex-col gap-y-1">
                        <h2 className="text-base">{review?.reviewer?.name}</h2>
                        <p className="text-xs">{review?.reviewer?.email}</p>
                        <p className="text-xs">
                          {new Date(review?.createdAt).toLocaleDateString(
                            "en-GB"
                          )}{" "}
                          • ⭐ {review?.rating}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">{review?.comment}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </Modal>
      )}
    </section>
  );
};

export default Description;
