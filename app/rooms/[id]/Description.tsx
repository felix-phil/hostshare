"use client";
import React, { FC, useState } from "react";

const Description: FC<{ description: string }> = ({ description }) => {
  const [expandDescription, setExpandDescription] = useState(false);
  return (
    <div className="pb-4 w-full flex flex-col pt-10">
      <p
        onClick={() => setExpandDescription((prev) => !prev)}
        className="text-[18px] font-thin text-black cursor-pointer"
      >
        {description.length > 300
          ? expandDescription
            ? description
            : description.substring(0, 300) + "..."
          : description}
      </p>

      {description.length > 300 && (
        <button
          onClick={() => setExpandDescription((prev) => !prev)}
          className="mt-5 self-start outline-none underline font-light text-[18px]"
        >
          {expandDescription ? "Hide" : "See more"}
        </button>
      )}
    </div>
  );
};

export default Description;
