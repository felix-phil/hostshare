import React, { FC, ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdOutlineClose } from "react-icons/md";

interface IProps {
  children: ReactNode;
  open?: boolean;
  onDismiss?: () => void;
  widthClassName?: string;
  heightClassName?: string;
  backgroundClassName?: string;
  showCloseButton?: boolean;
}
const Modal: FC<IProps> = ({ children, open, onDismiss, widthClassName="w-full max-w-3xl", heightClassName="", backgroundClassName="bg-white", showCloseButton=true }) => {
  const divConRef = useRef<HTMLDivElement>(null)
  const handleOutSideClick = (e: any) => {
    if (
      divConRef.current &&
      !divConRef.current.contains(e.target)
    ) {
      if(onDismiss) onDismiss()
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  });
  return (
    <motion.div
      variants={{
        open: {
          display: "flex",
          opacity: 1,
          // y: 0,
        },
        close: {
          display: "none",
          opacity: 0,
          // y: "50%",
        },
      }}
      initial="close"
      transition={{
        duration: 0.5,
        type: "spring",
        delay: 0.2,
      }}
      animate={open ? "open" : "close"}
      className={`relative z-[99999999] transition duration-300 ease-out`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      // onClick={onDismiss}
    >
      <div className="fixed inset-0 bg-black opacity-30 transition-all"></div>
      <div className="fixed z-[9999999] inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div
          ref={divConRef}
            className={
              `p-5 flex flex-col items-center relative ${backgroundClassName} rounded-lg text-left no-scrollbar overflow-y-scroll shadow-xl transform transition-all sm:my-8 ${widthClassName} ${heightClassName} `
            }
          >
            {showCloseButton && <button
              className="p-2 rounded-full hover:bg-slate-300 self-end flex items-center justify-center"
              onClick={onDismiss}
            >
              <MdOutlineClose size={25} className="fill-black" />
            </button>}
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
