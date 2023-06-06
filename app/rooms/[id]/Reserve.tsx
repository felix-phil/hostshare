"use client";
import moment from "moment";
import React, { FC, useEffect, useRef, useState } from "react";
import { CgChevronDown } from "react-icons/cg";
import { GiRoundStar } from "react-icons/gi";

const Reserve:FC<{priceString:string; ratings: number; reviewCount: number}> = ({priceString, ratings, reviewCount}) => {
  const [inputValues, setInputValues] = useState({
    checkIn: "",
    checkOut: "",
    guests: 0,
  });
  const [guestDropdown, setGuestDropdown] = useState(false);

  const dateCheckInRef = useRef<HTMLInputElement>(null);
  const dateCheckOutRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLInputElement>(null);

  const handleOutsideDropdownClick = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setGuestDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideDropdownClick);
    return () => {
      document.removeEventListener("click", handleOutsideDropdownClick);
    };
  });
  return (
    <div className="absolute w-full max-w-md  border flex flex-col border-opacity-20 border-black rounded-xl shadow-xl py-4 px-5">
      <div className="my-4 flex flex-row px-5 items-center justify-between">
        <div className="flex flex-row gap-x-1 place-items-end">
          <h4 className="text-[18px] font-semibold text-black">{priceString}</h4>
          <h5 className="text-[14px] font-normal text-gray-500">night</h5>
        </div>
        <div className="flex flex-row gap-x-1">
          <GiRoundStar size={16} className="fill-black" />
          <h4 className="text-[12px] text-black font-semibold">{ratings}</h4>
          <h4 className="text-[12px] text-gray-500 underline font-normal">
            {reviewCount} reviews
          </h4>
        </div>
      </div>
      <div className="flex flex-row gap-0 w-full">
        <div
          onClick={() => {
            if (dateCheckInRef?.current?.showPicker)
              dateCheckInRef?.current?.showPicker();
          }}
          className="py-2 cursor-pointer relative border-opacity-30 px-4 flex rounded-r-none rounded-b-none flex-col gap-y-1 flex-1 border border-black rounded-lg"
        >
          <h4 className="text-[12px] uppercase font bold text-black">
            Check In
          </h4>
          <h4 className="text-[14px] text-gray-500 font-light">
            {inputValues.checkIn
              ? moment(inputValues.checkIn).format("MM/DD/YY")
              : "Add Date"}
          </h4>
          <input
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                checkIn: e.target.value,
              }))
            }
            ref={dateCheckInRef}
            type="date"
            color="#fff"
            className="opacity-0 invisible w-0 h-0"
            placeholder="Select date"
          />
        </div>
        <div
          onClick={() => {
            if (dateCheckOutRef?.current?.showPicker)
              dateCheckOutRef?.current?.showPicker();
          }}
          className="py-2 cursor-pointer relative border-opacity-30  px-4 rounded-l-none rounded-b-none flex flex-col gap-y-1 flex-1 border border-black rounded-lg"
        >
          <h4 className="text-[12px] uppercase font bold text-black">
            Check Out
          </h4>
          <h4 className="text-[14px] text-gray-500 font-light">
            {inputValues.checkOut
              ? moment(inputValues.checkOut).format("MM/DD/YY")
              : "Add Date"}
          </h4>
          <input
            ref={dateCheckOutRef}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                checkOut: e.target.value,
              }))
            }
            type="date"
            color="#fff"
            className="opacity-0 invisible w-0 h-0"
            placeholder="Select date"
          />
        </div>
      </div>
      <div
        onClick={() => setGuestDropdown((prev) => !prev)}
        className="py-2 border-opacity-30 cursor-pointer relative px-4 flex flex-row justify-between items-center gap-y-1 flex-1 border border-black rounded-lg rounded-t-none"
      >
        <div className="flex flex-col gap-y-1">
          <h4 className="text-[12px] uppercase font bold text-black">Guests</h4>
          <h4 className="text-[14px] text-gray-500 font-light">
            {inputValues.guests > 0
              ? `${inputValues.guests} ${
                  inputValues.guests > 1 ? "guests" : "guest"
                }`
              : "Add Guest"}
          </h4>
        </div>
        <CgChevronDown size={25} className="fill-black" />
        {guestDropdown && (
          <div
            ref={dropdownRef}
            className="absolute overflow-y-auto none-scrollbar divide-opacity-30 shadow-xl h-[200px] w-full max-w-sm z-50 bottom-[-300%] right-0 bg-white rounded-xl"
          >
            <ul className="w-full flex flex-col divide-y divide-black divide-opacity-10">
              {Array.from({ length: 15 }).map((elm, index) => (
                <li
                  onClick={() => {
                    setInputValues((prev) => ({
                      ...prev,
                      guests: index + 1,
                    }));
                    setGuestDropdown(false);
                  }}
                  key={index}
                  className="cursor-pointer py-3 text-[14px] hover:bg-slate-200 px-5"
                >
                  {index + 1} guest
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full mt-5">
        <button className="px-6 py-4 w-full rounded-xl bg-gradient-to-br font-bold text-[14px] text-white from-primary to-primary/50">
          Reserve
        </button>
      </div>
    </div>
  );
};

export default Reserve;
