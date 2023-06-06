import { Listing } from "@/api/types";
import { data } from "autoprefixer";
import React, { FC } from "react";
import { IoLocationOutline, IoMedalOutline } from "react-icons/io5";

const Specials: FC<{
  rating: number;
  hostName: string;
  isSuperHost?: boolean;
}> = ({ rating, hostName, isSuperHost }) => {
  const percemtageSatisfied = (rating / 5) * 100;

  return (
    <div className="pb-6 w-full flex flex-col gap-y-6 pt-10">
      {isSuperHost && (
        <div className="flex flex-row gap-x-4">
          <IoMedalOutline size={30} className="fill-black opacity-70" />
          <div className="flex flex-col gap-y-2">
            <h4 className="font-sans font-medium text-xl text-black">
              {hostName} is Superhost
            </h4>
            <h6 className="font-sans text-[14px] font-light text-slate-600">
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </h6>
          </div>
        </div>
      )}
      {percemtageSatisfied >= 95 && (
        <div className="flex flex-row gap-x-4">
          <IoLocationOutline size={30} className="fill-black opacity-70" />
          <div className="flex flex-col gap-y-2">
            <h4 className="font-sans font-medium text-xl text-black">
              Great Location
            </h4>
            <h6 className="font-sans text-[14px] font-light text-slate-600">
              95% of recent guests gave the location a 5-star rating.
            </h6>
          </div>
        </div>
      )}
    </div>
  );
};

export default Specials;
