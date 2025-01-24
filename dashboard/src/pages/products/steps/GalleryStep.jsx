import React, { useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { toast } from "react-hot-toast";

const GalleryStep = ({ nextStep, errors, register, setGallery }) => {
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const handleGalleryPreview = (e) => {
    const files = e.target.files;

    if (files.length > 5) {
      toast.success("Maximum 5 images can be uploaded");
      window.location.reload();
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        setGallery(files);
      }
    }

    const previews = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setGalleryPreviews(previews);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {galleryPreviews?.length > 0 && (
          <div className="flex flex-row gap-x-2 overflow-x-auto">
            {galleryPreviews.map((preview, index) => (
              <div
                key={index}
                className="w-fit flex flex-col gap-y-1 relative flex-1"
              >
                <img
                  src={preview}
                  alt={"logo"}
                  width={96}
                  height={96}
                  className="w-full h-24 object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
        <label htmlFor="gallery" className="flex flex-col text-center gap-y-2">
          تصویر عنوان دسته بندی
          <input
            type="file"
            name="gallery"
            id="gallery"
            className="w-full h-fit opacity-0 absolute top-0 left-0 cursor-pointer z-50"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={handleGalleryPreview}
            required
          />
        </label>
        {errors?.gallery && (
          <span className="text-red-500 text-sm">
            {errors?.gallery.message}
          </span>
        )}
      </div>

      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </>
  );
};

export default GalleryStep;
