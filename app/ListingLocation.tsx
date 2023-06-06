import { Listing as ListingType } from "@/api/types";
import React, { FC, useEffect, useRef, useState } from "react";
import Listing from "./Listing";

const ListingLocation: FC<{
  lat: number;
  lng: number;
  priceString: string;
  listing: ListingType;
}> = ({ priceString, listing }) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleOutSideClick = (e: any) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      listRef.current &&
      !listRef.current.contains(e.target)
    ) {
      setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  });
  return (
    <div className="relative flex flex-col">
      {show && (
        <div
          ref={listRef}
          className="fixed -bottom-2 -left-2 z-[99] w-[250px] shadow-xl bg-white rounded-xl"
        >
          <Listing data={listing} />
        </div>
      )}
      <button
        ref={ref}
        onClick={() => setShow((prev) => !prev)}
        className="z-30 cursor-pointer hover:scale-105 px-6 py-2 rounded-xl bg-white flex items-center justify-center"
      >
        <h4 className="font-medium text-[16px]">{priceString}</h4>
      </button>
    </div>
  );
};

export default ListingLocation;
