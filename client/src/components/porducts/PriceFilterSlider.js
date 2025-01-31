import React, { useState } from 'react';

const PriceFilterSlider = () => {
  // محدوده مجاز قیمت
  const minAllowed = 0;
  const maxAllowed = 1000;

  const [minPrice, setMinPrice] = useState(minAllowed);
  const [maxPrice, setMaxPrice] = useState(maxAllowed);

  // تغییر مقدار حداقل قیمت
  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    // اطمینان از اینکه مقدار حداقل از مقدار حداکثر بیشتر نشود
    if (value <= maxPrice) {
      setMinPrice(value);
    }
  };

  // تغییر مقدار حداکثر قیمت
  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    // اطمینان از اینکه مقدار حداکثر از مقدار حداقل کمتر نشود
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl max-h-96 overflow-y-auto scrollbar-hide">
      <h2 className="text-lg">فیلتر قیمت</h2>
      <div className="flex flex-col gap-y-2.5">
        {/* اسلایدر حداقل قیمت */}
        <div className="flex flex-col">
          <label className="text-sm">
            حداقل قیمت: <span className="font-bold">{minPrice} تومان</span>
          </label>
          <input
            type="range"
            min={minAllowed}
            max={maxAllowed}
            step="10"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-full"
          />
        </div>

        {/* اسلایدر حداکثر قیمت */}
        <div className="flex flex-col">
          <label className="text-sm">
            حداکثر قیمت: <span className="font-bold">{maxPrice} تومان</span>
          </label>
          <input
            type="range"
            min={minAllowed}
            max={maxAllowed}
            step="10"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilterSlider;
