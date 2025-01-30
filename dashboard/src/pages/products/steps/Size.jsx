import React from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Size = ({ register, errors, prevStep, nextStep }) => {
  const sizes = [
    "نیم کیلویی",
    "یک کیلوئی",
    "یک و نیم کیلوئی ",
    "بزرگ",
    "کوچک",
    "متوسط",
    "یک لیتری",
    "یک و نیم لیتری",
    "سه لیتری",
  ];
  return (
    <>
      <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
        {/* sizes */}
        <label htmlFor="sizes" className="w-full flex flex-col gap-y-1">
          <span className="text-sm">اندازه*</span>
          <select
            name="sizes"
            id="sizes"
            size={5}
            multiple
            {...register("sizes", {
              validate: (value) => {
                if (!value || value.length === 0) {
                  return "انتخاب اندازه الزامی است";
                }
                if (value.length < 3) {
                  return "حداقل باید ۳ اندازه انتخاب شود";
                }
                if (value.length > 30) {
                  return "بیش از ۳۰ اندازه مجاز نیست";
                }
                return true;
              },
            })}
            className="rounded"
            required
          >
            {sizes.map((size, index) => (
              <option key={index} value={size}>
                {size.toUpperCase()}
              </option>
            ))}
          </select>
          {errors.sizes && (
            <span className="text-red-500 text-sm">{errors.sizes.message}</span>
          )}
        </label>
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Size;
