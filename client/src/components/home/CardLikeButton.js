import React from "react";
import { HeartEmpty, HeartFull } from "@/components/icons/Heart";

const CardLikeButton = ({ isLiked }) => {
  return (
    <button className="absolute top-4 right-5 z-10">
      {isLiked ? <HeartFull className="w-5 h-5 " /> : <HeartEmpty  className="w-5 h-5" />}
    </button>
  );
};

export default CardLikeButton;
