import React from "react";

const Campaign = ({ register, errors, prevStep, nextStep }) => {
  return (
    <>
      <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
        {/* campaign */}
        <label htmlFor="campaign" className="w-full flex flex-col gap-y-1">
          <span className="text-sm">کمپین فروش*</span>
          <p className="flex flex-row gap-x-4">
            <input
              type="text"
              name="campaignTitle"
              id="campaignTitle"
              {...register("campaignTitle", {
                required: "وارد کردن عنوان کمپین الزامی است",
                minLength: {
                  value: 3,
                  message: "عنوان کمپین  باید حداقل ۳ حرف داشته باشد",
                },
                maxLength: {
                  value: 30,
                  message: "عنوان کمپین  نباید بیشتر از ۳۰ حرف باشد",
                },
              })}
              className="w-full"
              placeholder="عنوان کمپین فروش را وارد کنید"
              required
            />
            
            <select
              name="campaignState"
              id="campaignState"
              {...register("campaignState", {
                required: "وارد کردن وضعیت کمپین الزامی است",
                minLength: {
                  value: 3,
                  message: "وضعیت کمپین باید حداقل ۳ حرف داشته باشد",
                },
                maxLength: {
                  value: 30,
                  message: "وضعیت کمپین نباید بیشتر از ۳۰ حرف باشد",
                },
              })}
              className="w-fit"
              defaultValue="choose-state"
              required
              
            >
              <option value="choose-state" disabled>
                انتخاب وضعیت کمپین
              </option>
              <option value="new-arrival">جدید</option>
              <option value="discount">تخفیف‌دار</option>
              <option value="sold-out">تمام‌شده</option>
              <option value="on-sale">در حال فروش</option>
            </select>
          </p>
          {errors.campaignTitle && (
          <span className="text-red-500 text-sm">{errors.campaignTitle.message}</span>
        )}
         {errors.campaignState && (
          <span className="text-red-500 text-sm">{errors.campaignState.message}</span>
        )}
        </label>

        {/* price */}
        <label htmlFor="price" className="w-full flex flex-col gap-y-1">
          <span className="text-sm">قیمت*</span>
          <input type="number" name="price" id="price" required 
           {...register("price", {
                required: "وارد کردن قیمت محصول الزامی است",
                minLength: {
                  value: 3,
                  message: "قیمت محصول باید حداقل ۳ حرف داشته باشد",
                },
                maxLength: {
                  value: 30,
                  message: "قیمت محصول نباید بیشتر از ۳۰ حرف باشد",
                },
              })} />
              {errors.price && (
          <span className="text-red-500 text-sm">{errors.price.message}</span>
        )}
        </label>
      </div>
     
    </>
  );
};

export default Campaign;
