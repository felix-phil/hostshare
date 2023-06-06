import { Listing as ListingType } from "@/api/types";
import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { wrap } from "popmotion";
import { MdChevronLeft, MdChevronRight, MdStar } from "react-icons/md";

interface IProps {
  data: ListingType;
}
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
const DotIndicator: FC<{ totalImages: number; currentIndex: number }> = ({
  totalImages,
  currentIndex,
}) => {
  const dots = Array.from({ length: 5 }); // Create an array of length 5

  return (
    <div className="flex flex-row gap-x-1">
      {dots.map((_, index) => (
        <div
          key={index}
          className={
            "h-2 w-2 rounded-full  " +
            (index === currentIndex % 5 ? "bg-white" : "bg-white/50")
          }
        />
      ))}
    </div>
  );
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
const Listing: FC<IProps> = ({ data }) => {
  const images = [data.info.mainImage, ...data.info.images.data];
  const [[page, direction], setPage] = useState([0, 0]);

  const currentImageIndex = wrap(0, images.length, page);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="w-full rounded-xl group overflow-hidden">
      <div className="h-[250px] w-full bg-slate-800 relative rounded-xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          {/* <Link href={`/rooms/${data?.info.id}`}> */}
          <motion.img
            key={page}
            alt={data.info.title}
            src={images[currentImageIndex].url}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            //   fill
            className="object-cover object-center h-full w-full"
          />
          {/* </Link> */}
        </AnimatePresence>
        <div className="lg:flex md:flex sm:flex absolute w-full h-full top-0 hidden flex-col">
          <div className="transition-all duration-150 ease-in-out mt-auto w-full invisible group-hover:visible flex flex-row px-2 justify-between">
            {currentImageIndex > 0 ? (
              <button
                onClick={() => paginate(-1)}
                className="flex bg-white h-7 hover:shadow-lg w-7 rounded-full items-center justify-center"
              >
                <MdChevronLeft />
              </button>
            ) : (
              <div></div>
            )}
            {currentImageIndex < images.length - 1 ? (
              <button
                onClick={() => paginate(1)}
                className="flex bg-white h-7 hover:shadow-lg w-7 rounded-full items-center justify-center"
              >
                <MdChevronRight />
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <div className="transition-all duration-150 ease-in-out mt-auto mb-5 w-full invisible group-hover:visible flex flex-row px-2 justify-center">
            <DotIndicator
              totalImages={images.length}
              currentIndex={currentImageIndex}
            />
          </div>
        </div>
      </div>
      <Link href={`/rooms/${data?.id}`} target="_blank">
        <div className="flex flex-col gap-y-1 mt-2 px-2">
          <div className="flex flex-row items-center justify-between">
            <h4 className="text-[12px] font-bold truncate text-black">
              {data.info.location.city}, {data.info.location.country.title}
            </h4>
            <div className="flex flex-row gap-x-1 items-center">
              <MdStar size={20} className="fill-black" />
              <h5 className="font-thin text-black text-[12px]">
                {data.info.ratings.accuracy}
              </h5>
            </div>
          </div>
          <h5 className="text-[12px] text-slate-500 font-light">
            {data.info.maxGuestCapacity} Guest(s) Capacity
          </h5>
          <h5 className="text-[12px] text-slate-500 font-light">
            {data.info.amenities.count} Amenities
          </h5>
          <div className="flex flex-row items-center gap-x-3">
            <h4 className="text-[12px] font-bold truncate text-black">
              {data.info.currency.symbol}
              {data.info.price}
            </h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Listing;
