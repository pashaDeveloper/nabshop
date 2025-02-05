import React from "react";
import { ArrowRight } from '@/components/icons/ArrowRight'
import  CardLikeButton  from './CardLikeButton'

// PopularProductCard Component
export const PopularProductCard = ({ image, title, subTitle, price, isLiked }) => {
  return (
    <div className="relative h-[400px] !w-[320px] group cursor-pointer  bg-white   rounded-primary shadow-lg p-6">
    {/* Like Button */}
    <CardLikeButton isLiked={isLiked} />

  
    {/* Product Image */}
    <div className="mt-4 flex justify-center">
      <div className="w-40 h-54 bg-white rounded-full relative     opacity-15 shadow-custom  flex items-center justify-center">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>
    </div>
    
    {/* Texts */}
    <div className="mt-6 text-left">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-base text-gray-500">{subTitle}</p>
      <p className="text-lg text-blue-500 font-bold">${price}</p>
    </div>
  
    {/* Action Button */}
    <div className="absolute bottom-4 right-4">
      <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center ">
        <ArrowRight className="w-12 h-12  transition-transform duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1" />
      </button>
    </div>
  </div>
  
  );
};

// PopularProductsSlider Component
export const PopularProductsSlider = () => {
  const foods = [
    {
      image: "/images/pizza.png",
      title: "Classic Pizza",
      subTitle: "House classical sauce",
      price: 12.58,
      isLiked: false,
    },
    {
      image: "/images/burger.png",
      title: "Mix Burger",
      subTitle: "Double Cheese",
      price: 15.21,
      isLiked: true,
    },
    {
      image: "/images/pizza.png",
      title: "Thin Crust Pizza",
      subTitle: "Almost borderless",
      price: 11.99,
      isLiked: true,
    },
    {
      image: "/images/pizza.png",
      title: "Thin Crust Pizza",
      subTitle: "Almost borderless",
      price: 11.99,
      isLiked: true,
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold px-5">Popular Products</h2>
      <div className="flex gap-4 overflow-x-auto px-5 py-5">
        {foods.map((item) => (
          <PopularProductCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};
