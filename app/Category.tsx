import React, { FC } from "react";
import { MdBed } from "react-icons/md";
import * as Icons from "react-icons/md";
import { capitalizeString } from "@/helpers";
import { getIcon } from "@/data/categories-icon";

interface IProps {
  title: string;
  type: string;
}
const getRandomIcon = (title: string) => {
  const keys = Object.keys(Icons);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  const randomValue = Icons[randomKey as keyof typeof Icons];
  return randomValue;
};
const Category: FC<IProps> = ({ title, type }) => {
  const Icon = getIcon(type);
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer group gap-y-2 px-3 py-2">
      <div className="flex items-center justify-center flex-col">
        <Icon
          //   size={30}
          className="fill-black/50 w-8 h-8 group-hover:fill-black transition-all delay-200 duration-200 ease-in-out"
        />
        <h1 className="transition-all delay-200 duration-200 ease-in-out text-[10px] text-center font-normal group-hover:text-black text-black/50 w-full truncate whitespace-nowrap">
          {title}
        </h1>
      </div>
      <div className="transition-all delay-200 duration-200 ease-in-out bg-transparent group-hover:bg-gray-400 w-[80%] border border-transparent rounded-xl" />
    </div>
  );
};

export default Category;
