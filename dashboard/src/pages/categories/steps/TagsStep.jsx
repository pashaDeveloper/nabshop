import React, { useState } from "react";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus"
const TagsStep = ({ register, errors,tags,setTags}) => {

  /* for tags */
  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };
  return (
    <>
    <div className="flex flex-col  max-h-96 overflow-y-auto p-2">
    <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
        <label htmlFor="tags" className="w-full flex flex-col gap-y-4">
          <p className="text-sm flex flex-row justify-between items-center">
            برچسب‌ها*
            <button
              type="button"
              className="p-0.5 border rounded-secondary bg-green-500 text-white"
              onClick={handleAddTag}
            >
              <Plus />
            </button>
          </p>

          {/* نمایش برچسب‌ها */}
          {tags.map((tag, index) => (
            <p key={index} className="flex flex-row gap-x-2 items-center">
              <input
                type="text"
                name="tags"
                placeholder="یک برچسب وارد کنید"
                className="flex-1"
                value={tag}
               
                onChange={(event) => handleTagChange(index, event.target.value)}
              />
              {index !== 0 && (
                <button
                  type="button"
                  className="p-0.5 border rounded-secondary bg-red-500 text-white"
                  onClick={() => handleRemoveTag(index)}
                >
                  <Minus />
                </button>
              )}
           {errors?.tags && (
          <span className="text-red-500 text-sm">{errors.tags.message}</span>
        )}
            </p>
          ))}
          
        </label>
      </div>
      </div>

      
    </>
  );
};

export default TagsStep;
