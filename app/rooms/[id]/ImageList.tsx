"use client";
import { Avatar } from "@/api/types";
import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { CgMenuGridO } from "react-icons/cg";
import Modal from "@/components/common/Modal";
import Gallery from "./Gallery";

interface IProps {
  images: Avatar[];
  pageTitle: string;
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
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ImageDisplay = ({
  src,
  onClick,
}: {
  src: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="h-full w-full relative group cursor-pointer"
    >
      <motion.img
        src={src}
        className="w-full h-full object-cover object-center bg-slate-300"
      />
      <div className="transition-all duration-200 delay-150 ease-in-out hidden z-10 opacity-0 hover:opacity-20 group-hover:flex absolute top-0 w-full h-full bg-black"></div>
    </div>
  );
};
const ImageList: FC<IProps> = ({ images, pageTitle }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const currentImageIndex = wrap(0, images.length, page);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const [showPicturesList, setShowPicturesList] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  return (
    <React.Fragment>
      <div className="relative rounded-xl overflow-hidden hidden lg:grid md:grid grid-rows-2 gap-3 grid-cols-4 xl:h-[60vh] lg:h-[50vh] md:h-[40vh] w-full">
        <div className="col-span-2 row-span-2 bg-slate-300">
          <ImageDisplay
            onClick={() => setShowPicturesList(true)}
            src={images[0]?.url || ""}
          />
        </div>
        <div className="col-span-1 bg-slate-300">
          <ImageDisplay
            onClick={() => setShowPicturesList(true)}
            src={images[1]?.url || ""}
          />
        </div>
        <div className="col-span-1 bg-slate-300">
          <ImageDisplay
            onClick={() => setShowPicturesList(true)}
            src={images[2]?.url || ""}
          />
        </div>
        <div className="col-span-1 bg-slate-300">
          <ImageDisplay
            onClick={() => setShowPicturesList(true)}
            src={images[3]?.url || ""}
          />
        </div>
        <div className="col-span-1 bg-slate-300">
          <ImageDisplay
            onClick={() => setShowPicturesList(true)}
            src={images[3]?.url || ""}
          />
        </div>
        <button
          onClick={() => setShowPicturesList((prev) => !prev)}
          className="z-30 px-7 active:scale-95 transition-all duration-200 delay-150 ease-in-out py-2 text-black flex text-[12px] font-normal flex-row gap-x-3 absolute bottom-[5%] right-[2%] bg-white rounded-lg border border-black"
        >
          <CgMenuGridO size={18} /> Show all photos
        </button>
      </div>
      <div className=" sm:h-[40vh] h-[30vh] w-full relative flex md:hidden bg-slate-300">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            alt={pageTitle}
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
            className="object-cover object-center h-full w-full"
          />
        </AnimatePresence>
        <div className="absolute z-40 bottom-5 px-2 py-1 rounded-sm text-white font-light text-[10px] right-5 bg-gradient-to-r from-black to-black">
          {page + 1} / {images.length}
        </div>
      </div>
      <Modal
        widthClassName="w-screen"
        heightClassName="h-screen"
        open={showPicturesList}
        onDismiss={() => setShowPicturesList(false)}
      >
        <div className="w-full max-w-4xl grid grid-cols-2 gap-x-3 gap-y-3 self-center items-center justify-center">
          {images?.map((image, index) => (
            <div
              className={`${index % 3 === 0 ? "col-span-full" : "col-span-1"}`}
              key={index}
            >
              <ImageDisplay
                onClick={() => setShowGallery((prev) => !prev)}
                src={image?.url}
              />
            </div>
          ))}
        </div>
      </Modal>
      <Gallery
        open={showGallery}
        onDismiss={() => setShowGallery(false)}
        images={images}
      />
    </React.Fragment>
  );
};

export default ImageList;
