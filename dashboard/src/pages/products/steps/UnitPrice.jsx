import React, { useState } from "react";
import Dropdown from "@/components/shared/dropdown/Dropdown";
import { Controller } from "react-hook-form";
import Trash from "./../../../components/icons/Trash";

const UnitPrice = ({ control, index, remove, errors, units }) => {

  
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="grid items-center grid-cols-12 gap-x-2">
        <div className="col-span-7">
          یک واحد انتخاب کنید
          {/* انتخاب واحد */}
          <Controller
            control={control}
            name={`variations.${index}.unit`}
            rules={{ required: "انتخاب واحد الزامی است" }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={units.map((unit) => ({
                  id: unit._id,
                  value: unit.title,
                  description: unit.description, // اضافه کردن توضیحات
                }))}
                placeholder="انتخاب واحد"
                value={value}
                onChange={onChange}
                className="w-full"
                error={errors.variations?.[index]?.unit}
              />
            )}
          />
        </div>
        <div className="col-span-5">
        قیمت واحد انتخابی
         <div className="flex flex-row">

          {/* فیلد قیمت */}
          <Controller
      control={control}
      name={`variations.${index}.price`}
      rules={{
        required: "وارد کردن قیمت الزامی است",
        min: { value: 1, message: "قیمت باید بزرگتر از ۰ باشد" },
      }}
      render={({ field: { onChange, value } }) => (
        <div className="flex flex-col">
          <input
            type="number"
            inputMode="numeric"
            value={value || ""}
            onChange={(e) => {
              const rawValue = e.target.value;
              if (!isNaN(rawValue) && rawValue !== "") {
                onChange(Number(rawValue)); // مقدار عددی را ذخیره می‌کند
              }
            }}
            className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
            placeholder="قیمت را وارد کنید..."
          />
          
        </div>
      )}
    />
     <div className="col-span-1">
          <button
            type="button"
            className="p-1 rounded"
            onClick={() => remove(index)}
          >
            <Trash className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>
        
        </div>
        </div>

        {/* دکمه حذف */}
       
      </div>

      {/* نمایش پیام خطا */}
      {errors.variations?.[index]?.unit && (
        <span className="text-red-500 text-sm">
          {errors.variations[index].unit.message}
        </span>
      )}
      {errors.variations?.[index]?.price && (
        <span className="text-red-500 text-sm">
          {errors.variations[index].price.message}
        </span>
      )}
    </div>
  );
};

export default UnitPrice;
