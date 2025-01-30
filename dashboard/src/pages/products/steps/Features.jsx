import React ,{useState} from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import Plus from "@/components/icons/Plus"
import Minus from "@/components/icons/Minus"
const Features = ({ register, errors, prevStep, nextStep,features,setFeatures }) => {
  function handleAddFeature() {
    setFeatures([...features, { title: "", content: [""] }]);
  }

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };

  const handleAddContent = (featureIndex) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content.push("");
    setFeatures(updatedFeatures);
  };

  const handleRemoveContent = (featureIndex, contentIndex) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content.splice(contentIndex, 1);
    setFeatures(updatedFeatures);
  };

  const handleContentChange = (featureIndex, contentIndex, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content[contentIndex] = value;
    setFeatures(updatedFeatures);
  };
  return (
    <>
      <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
        {features.map((feature, index) => (
          <label
            key={index}
            htmlFor="features"
            className="flex flex-col gap-y-1"
          >
            <span className="text-sm flex flex-row justify-between items-center">
              ویژگی های محصول را وارد کنید*
              <span className="flex flex-row gap-x-1">
                {index > 0 && (
                  <span
                    className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 text-white"
                    onClick={() => handleRemoveFeature(index)}
                  >
                    <Minus />
                  </span>
                )}
                {index === features.length - 1 && (
                  <span
                    className="cursor-pointer p-0.5 border rounded-secondary bg-green-500 text-white"
                    onClick={handleAddFeature}
                  >
                    <Plus />
                  </span>
                )}
              </span>
            </span>
            <div className="flex flex-col gap-y-2.5">
              <input
                type="text"
                name="title"
                placeholder="عنوان ویژگی را وارد کنید"
                maxLength="100"
                value={feature.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                required
              />
              {feature.content.map((content, contentIndex) => (
                <div
                  key={contentIndex}
                  className="flex flex-row gap-x-2 items-center"
                >
                  <input
                    type="text"
                    name="content"
                    placeholder="محتوای ویژگی را وارد کنید"
                    maxLength="200"
                    className="flex-1"
                    value={content}
                    onChange={(e) =>
                      handleContentChange(index, contentIndex, e.target.value)
                    }
                    required
                  />
                  {/* remove a content */}
                  {contentIndex > 0 && (
                    <span
                      className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 text-white"
                      onClick={() => handleRemoveContent(index, contentIndex)}
                    >
                      <Minus />
                    </span>
                  )}
                  {/* add a content */}
                  <span
                    className="cursor-pointer p-0.5 border rounded-secondary bg-green-500 text-white"
                    onClick={() => handleAddContent(index)}
                  >
                    <Plus />
                  </span>
                </div>
              ))}
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Features;
