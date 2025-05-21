"use client";

import React from "react";
import { BiChevronDown, BiChevronLeft, BiChevronUp } from "react-icons/bi";

const DetailCard = ({ title, content,icon }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <section className="relative flex flex-col gap-y-2.5">
      <div
        className="flex flex-row justify-between items-start bg-slate-200/80 hover:bg-slate-200/60 dark:bg-black rounded-primary pr-0.5  pl-4 py-0.5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-start gap-x-2 items-center">
          <span className="w-8 h-8 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
            {icon}
          </span>
          <h2
            className={"flex line-clamp-1" + (isOpen ? " line-clamp-none" : "")}
          >
            {title}
          </h2>
        </div>
        {isOpen ? (
          <span className="border rounded-secondary">
            <BiChevronUp className="h-5 w-5" />
          </span>
        ) : (
          <span className="border rounded-secondary">
            <BiChevronDown className="h-5 w-5" />
          </span>
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-y-2">
          {content?.map((content, index) => (
            <p
              key={index}
              className="text-sm flex flex-row items-start gap-x-1.5 line-clamp-1"
            >
              <span className="">
                <BiChevronLeft className="h-4 w-4" />
              </span>{" "}
              {content}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default DetailCard;
