"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { type Category as CategoryType } from "@/api/types";
import apiEndpoints from "@/api/api-endpoints";
import Category from "./Category";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const SkeletonCategory = () => {
  return (
    <div className="animate-pulse flex flex-col justify-center items-center cursor-pointer group gap-y-2 px-3 py-2">
      <div className="flex items-center justify-center flex-col">
        <div className="h-6 w-6 rounded-full bg-slate-300"></div>
      </div>
        <div className="h-2 w-10 rounded-lg bg-slate-300"></div>
    </div>
  );
};
const Categories = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data as CategoryType[]);
  const { data, isLoading, isValidating } = useSWR(
    apiEndpoints.CATEGORIES,
    fetcher
  );
  const onRightCLick = (scrollDistance = 100) => {
    if (scrollContainerRef.current?.scrollWidth) {
      scrollContainerRef.current.scrollLeft += scrollDistance;
    }
  };
  const onLeftClick = (scrollDistance = 100) => {
    if (scrollContainerRef.current?.scrollWidth) {
      scrollContainerRef.current.scrollLeft -= scrollDistance;
    }
  };
  return (
    <div className="w-full mt-4 flex flex-row items-center justify-center">
      {/* {scrollContainerRef.current &&
        scrollContainerRef.current.scrollLeft > 0 && ( */}
      <button
        onClick={() => onLeftClick()}
        className="hidden md:flex lg:flex h-6 border border-black/30 hover:border-black hover:shadow-lg w-6 rounded-full items-center justify-center"
      >
        <MdChevronLeft />
      </button>
      {/* )} */}
      <div
        ref={scrollContainerRef}
        className="none-scrollbar flex-1 gap-x-3 flex flex-row flex-nowrap overflow-auto"
      >
        {isLoading &&
          !data &&
          Array.from({ length: 50 }).map((_, idx) => (
            <SkeletonCategory key={idx} />
          ))}
        {data?.map((cat) => (
          <Category title={cat.title} type={cat.type} key={cat.id} />
        ))}
      </div>
      {/* {scrollContainerRef.current &&
        scrollContainerRef.current.scrollLeft <
          scrollContainerRef.current.clientWidth && ( */}
      <button
        onClick={() => onRightCLick()}
        className="h-6 hidden md:flex lg:flex border border-black/30 hover:border-black hover:shadow-lg w-6 rounded-full items-center justify-center"
      >
        <MdChevronRight />
      </button>
      {/* )} */}
    </div>
  );
};

export default Categories;
