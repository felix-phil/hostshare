"use client";
import { Listing } from "@/api/types";
import Modal from "@/components/common/Modal";
import { getIcon } from "@/data/categories-icon";
import React, { FC, useState } from "react";

const Amenities: FC<{ data?: Listing["info"]["amenities"] }> = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const amentiesByGroup = data?.data?.reduce(
    (acc, item) =>
      Object.assign(acc, {
        [item.group]: [...(acc[item.group as keyof typeof acc] || []), item],
      }),
    {}
  ) as
    | {
        [key: string]: {
          available: boolean;
          group: string;
          title: string;
          type: string;
        }[];
      }
    | undefined;
  return (
    <div className="pb-6 w-full flex flex-col gap-y-6 pt-10">
      <h3 className="text-xl font-medium">What this place offers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-y-3">
        {data?.data?.slice(0, 10)?.map((utility, index) => {
          const Icon = getIcon(utility?.type);
          return (
            <div key={index} className="flex flex-row gap-x-4">
              <Icon size={30} className="fill-black/50 opacity-70" />
              <h4 className="text-lg font-light tracking-wide capitalize">
                {utility?.title}
              </h4>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setOpenModal(true)}
        className="mt-5 transition-all duration-200 ease-in-out px-8 hover:bg-slate-300/50 py-3 self-start rounded-lg text-black font-semibold text-[16px] border border-black border-opacity-50"
      >
        Show all {data?.count} amenities
      </button>
      <Modal open={openModal} onDismiss={() => setOpenModal(false)}>
        <div className="flex flex-col self-start gap-y-5 w-full">
          <h3 className="text-xl font-medium">What this place offers</h3>
          {amentiesByGroup &&
            Object.keys(amentiesByGroup).map((key) => (
              <div key={key} className="flex flex-col gap-y-5">
                <h3 className="text-lg font-medium capitalize">{key}</h3>
                <div className="flex flex-col divide-y divide-black divide-opacity-20">
                  {amentiesByGroup[key]?.map((amenity, index) => {
                    const Icon = getIcon(amenity?.type);
                    return (
                      <div key={index} className="flex flex-row gap-x-4 py-5">
                        <Icon size={30} className="fill-black/50 opacity-70" />
                        <h4 className="text-lg font-light tracking-wide capitalize">
                          {amenity?.title}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default Amenities;
