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
              className="w-full"
              placeholder="Enter campaign title"
              required
            />
            <select
              name="campaignState"
              id="campaignState"
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
        </label>

        {/* price */}
        <label htmlFor="price" className="w-full flex flex-col gap-y-1">
          <span className="text-sm">قیمت*</span>
          <input type="number" name="price" id="price" required />
        </label>
      </div>
     
    </>
  );
};

export default Campaign;
