"use client";
import apiEndpoints from "@/api/api-endpoints";
import { Listing as ListingType } from "@/api/types";
import ToggleButton from "@/components/common/ToggleButton";
import axios from "axios";
import React, { Suspense, useState } from "react";
import useSWR from "swr";
import Listing from "./Listing";
import { FaListUl, FaMap } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MapListing from "./MapListing";
import { motion } from "framer-motion";
import path from "path";
import { BiBuildingHouse } from "react-icons/bi";
import { MdClose } from "react-icons/md";

const SkeletonListing = () => {
  return (
    <div className="w-full rounded-xl group overflow-hidden animate-pulse">
      <div className="h-[250px] w-full bg-slate-300 rounded-xl overflow-hidden"></div>
      <div className="flex flex-col gap-y-1 mt-2 px-2">
        <div className="h-4 rounded-lg bg-slate-300 w-[90%]"></div>
        <div className="h-4 rounded-lg bg-slate-300 w-[50%]"></div>
        <div className="h-4 rounded-lg bg-slate-300 w-[25%]"></div>
        <div className="h-4 rounded-lg bg-slate-300 w-[15%]"></div>
      </div>
    </div>
  );
};
const Listings = () => {
  const [totalPrice, setTotalPrice] = useState(false);
  const searhParams = useSearchParams();
  const pathname = usePathname();
  const map_drawer_open = searhParams.get("map_drawer_open");
  const question = searhParams.get("q");

  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data as ListingType[]);
  const { data, isLoading, isValidating } = useSWR(
    apiEndpoints.LISTINGS(question || ""),
    fetcher
  );
  const router = useRouter();
  const showMapOrList = () => {
    if (map_drawer_open === "true") {
      if (question) {
        router.replace(`${pathname}?q=${question}&map_drawer_open=false`);
      } else {
        router.replace(`${pathname}?map_drawer_open=false`);
      }
    } else {
      if (question) {
        router.replace(`${pathname}?q=${question}&map_drawer_open=true`);
      } else {
        router.replace(`${pathname}?map_drawer_open=true`);
      }
    }
  };
  const clearFilters = () => {
    router.replace(pathname);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="w-full mx-auto py-5 max-w-2xl rounded-xl border border-slate-300 flex flex-row justify-between px-5">
        <div className="flex flex-row divide-x divide-slate-400 text-[14px] items-center justify-center">
          <h4 className="font-bold text-black dark:text-white pr-3">
            Display total price
          </h4>
          <h4 className="font-bold text-gray-400 pl-3">
            Includes all fees, before taxes
          </h4>
        </div>

        <ToggleButton
          checked={totalPrice}
          onClick={() => setTotalPrice((prev) => !prev)}
        />
      </div>
      {/* Listings */}
      <div className="relative flex flex-col w-full items-center">
        <motion.div
          key={map_drawer_open}
          variants={{
            out: {
              opacity: 0,
              x: "-100%",
            },
            in: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{
            duration: 1,
            delay: 0.5,
            type: "spring",
          }}
          initial="out"
          exit={"out"}
          animate="in"
          className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-5 w-full place-items-center mt-6 px-4 py-4"
        >
          {isLoading &&
            !data &&
            Array.from({ length: 25 }).map((_, idx) => (
              <SkeletonListing key={idx} />
            ))}

          {data && data.length > 0 ? (
            map_drawer_open === "true" ? (
              <MapListing listings={data} />
            ) : (
              data?.map((listing, index) => (
                <Listing key={listing.id} data={listing} />
              ))
            )
          ) : (
            <div className="col-span-full flex gap-y-4 flex-col h-[50vh] w-screen items-center justify-center">
              <BiBuildingHouse size={50} className="fill-slate-400" />
              <h4 className="font-semibold text-2xl text-black">
                Nothing was found
              </h4>
              <button
                onClick={clearFilters}
                className="hover:scale-105 transition-all ease-in-out duration-150 text-primary flex flex-row items-center gap-x-3 text-[17px] bg-transparent outline-none"
              >
                <MdClose className="fill-primary" /> Clear Filters
              </button>
            </div>
          )}
        </motion.div>
        {data && data?.length > 0 && !isLoading && (
          <div className="fixed bottom-[10%] z-50 mr-auto ml-auto">
            <button
              onClick={() => showMapOrList()}
              className="transition-all duration-100 delay-100 hover:scale-105  flex flex-row items-center justify-center gap-x-2  py-3 px-5 text-white text-[15px] font-normal bg-black rounded-full"
            >
              Show {map_drawer_open ? "list" : "map"}{" "}
              {map_drawer_open ? <FaListUl size={20} /> : <FaMap size={20} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;
