// components/signup/steps/PasswordStep.jsx
import React, { useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
const KeynotesStep = ({
  register,
  errors,
  prevStep,
  nextStep,
  keynotes,
  setKeynotes,
}) => {
  /* for keynotes */
  const handleAddKeynote = () => {
    setKeynotes([...keynotes, ""]);
  };

  const handleRemoveKeynote = (index) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes.splice(index, 1);
    setKeynotes(updatedKeynotes);
  };

  const handleKeynoteChange = (index, value) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes[index] = value;
    setKeynotes(updatedKeynotes);
  };
  return (
    <>
    <div className="flex flex-col  max-h-96 overflow-y-auto p-2">

      <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
        <label htmlFor="keynotes" className="w-full flex flex-col gap-y-4">
          <p className="text-sm flex flex-row justify-between items-center">
            نکات کلیدی*
            <button
              type="button"
              className="p-0.5 border rounded-secondary bg-green-500 text-white"
              onClick={handleAddKeynote}
            >
              <Plus />
            </button>
          </p>

          {/* نمایش نکات کلیدی */}
          {keynotes.map((keynote, index) => (
            <p key={index} className="flex flex-row gap-x-2 items-center">
              <input
                type="text"
                name="keynotes"
                placeholder="یک نکته کلیدی وارد کنید"
                className="flex-1"
                value={keynote}
                onChange={(event) =>
                  handleKeynoteChange(index, event.target.value)
                }
                
              />
              {index !== 0 && (
                <button
                  type="button"
                  className="p-0.5 border rounded-secondary bg-red-500 text-white"
                  onClick={() => handleRemoveKeynote(index)}
                >
                  <Minus />
                </button>
              )}
            </p>
          ))}
        </label>
      </div>

      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
      </div>
  
    </>
  );
};

export default KeynotesStep;
