import { Avatar } from "@/api/types";
import Modal from "@/components/common/Modal";
import React, { FC, useState } from "react";
import { MdChevronLeft, MdChevronRight, MdOutlineClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";

interface IProps {
  images: Avatar[];
  open: boolean;
  onDismiss: () => void;
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
const Gallery: FC<IProps> = ({ open, onDismiss, images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const currentImageIndex = wrap(0, images.length, page);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <Modal
      widthClassName="w-screen"
      heightClassName="h-screen"
      backgroundClassName="bg-black"
      open={open}
      onDismiss={onDismiss}
      showCloseButton={false}
    >
      <div className="w-full h-full  flex flex-col gap-y-3 self-center items-center justify-center">
        <div className="w-full flex flex-row justify-between py-3 items-center">
          <button
            onClick={onDismiss}
            className="rounded-lg text-[16px] flex flex-row items-center gap-x-2 text-white px-5 py-2 hover:bg-slate-100/50"
          >
            <MdOutlineClose size={20} className="fill-white" /> Close
          </button>
          <h5 className="text-[16px] text-white">
            {page + 1} / {images.length}
          </h5>
          <div></div>
        </div>
        <div className="w-full  flex flex-row justify-between items-center">
          {currentImageIndex > 0 ? (
            <button
              onClick={() => paginate(-1)}
              className="p-3 flex items-center justify-center border border-white hover:bg-slate-100/50 rounded-full"
            >
              <MdChevronLeft size={30} className="fill-white" />
            </button>
          ) : (
            <div></div>
          )}
          <div className={"flex-1 h-[80vh] max-w-[80%]"}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={page}
                alt={`Gallery Image ${currentImageIndex}`}
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
          </div>
          {currentImageIndex < images.length - 1 ? (
            <button
              onClick={() => paginate(1)}
              className="p-3 flex items-center justify-center border border-white hover:bg-slate-100/50 rounded-full"
            >
              <MdChevronRight size={30} className="fill-white" />
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Gallery;
