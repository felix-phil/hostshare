import React, { ComponentProps, FC, HTMLProps, useState } from "react";
import { motion } from "framer-motion";
import { MdCheck } from "react-icons/md";

interface IProps extends ComponentProps<typeof motion.button> {
  checked?: boolean;
}
const ToggleButton: FC<IProps> = ({ checked = false, type, ...props }) => {
  return (
    <motion.button
      variants={{
        checked: {
          backgroundColor: "rgb(107 114 128)",
        },
        unchecked: {
          backgroundColor: "rgb(156 163 175)",
        },
      }}
      animate={checked ? "checked" : "unchecked"}
      {...props}
      className="w-14 h-9 py-1 rounded-full hover:bg-gray-500 px-1"
    >
      <motion.div
        variants={{
          checked: {
            x: "75%",
          },
          unchecked: {
            x: 0,
          },
        }}
        transition={{
          type: "tween",
          duration: 0.2,
        }}
        animate={checked ? "checked" : "unchecked"}
        className="h-7 w-7 flex items-center justify-center my-auto rounded-full bg-white"
      >
        <motion.div
          variants={{
            checked: {
              visibility: "visible",
              opacity: 1,
            },
            unchecked: {
              visibility: "hidden",
              opacity: 0,
            },
          }}
          animate={checked ? "checked" : "unchecked"}
        >
          <MdCheck className="fill-black h-5 w-5" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ToggleButton;
