import React from "react";
import ImageList from "./ImageList";
import axios from "axios";
import apiEndpoints from "@/api/api-endpoints";
import { Avatar, Listing } from "@/api/types";
import { MdChevronLeft } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CiExport } from "react-icons/ci";
import Link from "next/link";
import { data } from "autoprefixer";
import Image from "next/image";
import Description from "./Description";
import Specials from "./Specials";
import Amenities from "./Amenities";

async function getListing(id: string) {
  try {
    const res = await axios.get(
      process.env.SITE_URL + apiEndpoints.SINGLE_LISTING(id)
    );
    return res.data as Listing;
  } catch (error) {
    return null;
  }
}
interface IProps {
  params: { id: string };
}
const Page = async ({ params }: IProps) => {
  const listing = await getListing(params.id);
  const images: Avatar[] = [];
  if (listing?.info.mainImage) {
    images.push(listing?.info.mainImage);
  }
  if (listing?.info.images.data) {
    images.push(...(listing?.info?.images?.data || []));
  }
  return (
    <main className="w-full max-w-[1200px] flex items-center flex-col">
      <div className="hidden my-5 self-start lg:flex md:flex flex-col gap-y-2 mx-5">
        <h2 className="text-3xl font-medium tracking-wide ">
          {listing?.info?.title}
        </h2>
        <div className="flex flex-row gap-x-3">
          <h5 className="text-sm font-medium underline">
            {listing?.info?.visibleReviewCount} reviews
          </h5>
          <h5 className="text-sm font-medium underline">
            {listing?.info?.location?.city},{" "}
            {listing?.info?.location?.country.title}
          </h5>
        </div>
      </div>
      <div className="md:hidden w-full flex px-3  flex-row justify-between items-center py-5 gap-y-2">
        <Link href="/">
          <div className="flex flex-row gap-x-2 group">
            <MdChevronLeft size={20} className="fill-black" />
            <h5 className="font-semibold text-[14px] group-hover:underline">
              Homes
            </h5>
          </div>
        </Link>
        <div className="flex flex-row gap-x-4">
          <CiExport size={18} className="fill-black" />
          <FaRegHeart size={18} className="fill-black" />
        </div>
      </div>
      <div className="md:px-5 px-0 w-full">
        <ImageList images={images} pageTitle={listing?.info?.title || ""} />
      </div>
      {/* Title */}
      <div className="flex py-5 self-start md:hidden flex-col gap-y-2 px-5 border-b border-black border-opacity-20 w-full">
        <h2 className="text-xl font-medium tracking-wide ">
          {listing?.info.title}
        </h2>
        <div className="flex flex-row gap-x-3">
          <h5 className="text-sm font-medium underline">
            {listing?.info.visibleReviewCount} reviews
          </h5>
          <h5 className="text-sm font-medium underline">
            {listing?.info.location?.city},{" "}
            {listing?.info.location?.country?.title}
          </h5>
        </div>
      </div>
      <div className="grid grid-cols-12 w-full self-start px-5 mt-5 md:mt-10 mb-32">
        <div className="md:col-span-8 col-span-full flex flex-col divide-y divide-black divide-opacity-20">
          {/* Details and Host */}
          <div className="flex flex-row justify-between py-4 items-center">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-xl capitalize md:text-2xl lg:text-3xl font-medium tracking-wide ">
                {listing?.info?.type} hosted by{" "}
                {listing?.info?.host?.name || "'Not Known'"}
              </h2>
              <div className="flex flex-row text-[18px] font-thin flex-wrap text-slate-800 gap-x-2">
                {listing?.info.details.data
                  ?.slice(0, 4)
                  .map((detail, index) => (
                    <div
                      key={detail.type}
                      className="flex flex-row gap-x-2 items-center"
                    >
                      <h5 className="">
                        {detail.value} {detail.type}
                      </h5>
                      {index < listing?.info.details.data.length - 1 && (
                        <div className="h-1 w-1 rounded-full bg-slate-400" />
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="h-12 w-12 flex-shrink-0 relative bg-slate-300 rounded-full overflow-hidden">
              <Image
                fill
                className="object-cover object-center"
                alt={listing?.info?.host?.name || "host"}
                src={listing?.info?.host?.avatar?.url || ""}
              />
            </div>
          </div>

          {/* Specials */}
          <Specials
            isSuperHost={listing?.info?.host?.isSuperHost}
            hostName={listing?.info?.host?.name || ""}
            rating={listing?.info?.ratings?.guestSatisfactionOverall || 0}
          />
          {/* Desciption */}

          <Description description={listing?.info?.description || ""} />

          {/* Offerings */}
          <Amenities data={listing?.info?.amenities} />
        </div>
        <div className="md:col-s4 md:flex hidden"></div>
      </div>

      {/* bottom for mobile */}
      <div className="w-full z-50 bg-white flex flex-row justify-between absolute border-t border-black border-opacity-20 bottom-0 py-2 px-3 md:hidden">
        <div className="flex flex-row items-center">
          <h4 className="text-[16px] font-bold text-black">
            {listing?.info.currency?.symbol}
            {listing?.info.price}
          </h4>
          <h4 className="ml-2 text-[12px] font-normal text-gray-500">
            night
          </h4>
        </div>
        <button className="px-6 py-4 rounded-xl bg-gradient-to-br font-bold text-[14px] text-white from-primary to-primary/50">
          Reserve
        </button>
      </div>
    </main>
  );
};

export default Page;
