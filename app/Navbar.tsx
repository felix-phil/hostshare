"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch, FaGlobe } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
const routesToHide = ["/rooms"];

const Navbar = () => {
  const pathname = usePathname();
  const hideInRoute = routesToHide.some((path) => pathname?.startsWith(path));
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleOutSideClick = (e: any) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      divRef.current &&
      !divRef.current.contains(e.target)
    ) {
      setShowSearch(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  });
  const onSearchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?q=${searchText.trim()}`);
    setShowSearch(false);
  };
  return (
    <React.Fragment>
      <div
        className={`w-full border border-gray-600 border-opacity-50 py-2 lg:flex md:flex items-center justify-center ${
          hideInRoute ? "hidden" : "flex"
        }`}
      >
        <div className="w-full max-w-[1600px] flex items-center  flex-row max-h-16 my-3 px-5">
          <Link href={"/"}>
            <div className="hidden md:flex lg:flex">
              <Image
                alt="logo"
                src={"/logo_light.png"}
                className="object-contain hidden lg:flex"
                width={150}
                height={15}
              />
              <Image
                alt="logo"
                src={"/icon.png"}
                className="object-contain lg:hidden"
                width={40}
                height={40}
              />
            </div>
          </Link>
          <div
            onClick={() => setShowSearch((prev) => !prev)}
            ref={ref}
            className="text-[14px] lg:mx-auto md:ml-3 md:mr-auto mx-auto font-semibold transition-all ease-in-out duration-200 grid items-center justify-center grid-cols-3 rounded-3xl divide-x divide-solid divide-gray-400 divide-opacity-50 py-2 border-gray-400 border shadow-md hover:shadow-xl cursor-pointer"
          >
            <div className="px-2 text-center">
              <h1 className="whitespace-nowrap">Anywhere</h1>
            </div>
            <div className="px-2 text-center">
              <h1 className="whitespace-nowrap">Any week</h1>
            </div>
            <div className="px-2 flex flex-row gap-x-2 items-center justify-center">
              <h1 className="whitespace-nowrap text-gray-400">Add guests</h1>
              <div className="rounded-full w-8 h-8 flex items-center justify-center bg-primary">
                <FaSearch color="#fff" />
              </div>
            </div>
          </div>
          <div className="flex-row gap-x-4 items-center justify-center hidden md:flex lg:flexr">
            <h4 className="whitespace-nowrap text-[14px]">
              HostShare your home
            </h4>
            <FaGlobe color="#000" className="h-5 w-5" />
            <div className="rounded-full flex flex-row gap-x-3 py-3 border-gray-400 border shadow-md hover:shadow-xl cursor-pointer px-3">
              <MdMenu color="#000" className="h-5 w-5" />
              <div className="h-5 w-5">
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    height: "100%",
                    width: "100%",
                    fill: "currentcolor",
                  }}
                >
                  <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Search */}
      <motion.div
        variants={{
          open: {
            visibility: "visible",
            y: 0,
            scale: 1,
            // opacity: 1
          },
          close: {
            visibility: "hidden",
            scale: 0.5,
            y: "-100%",
          },
        }}
        transition={{
          duration: 0.2,
          delay: 0.1,
          type: "tween",
        }}
        animate={showSearch ? "open" : "close"}
        initial="close"
        ref={divRef}
        className="fixed w-full flex h-screen z-[999]"
      >
        <div className="w-full h-full relative">
          <div
            onClick={() => setShowSearch(false)}
            className="w-full h-full bg-black opacity-40"
          ></div>
          <div className="absolute top-0 w-full flex items-center flex-col bg-white py-8">
            <form
              onSubmit={onSearchHandler}
              className="w-full flex items-center flex-col bg-white"
            >
              <div className="w-full shadow-lg max-w-2xl h-[50px] border border-black border-opacity-20 flex flex-row items-center rounded-full pr-2 pl-5 overflow-hidden bg-white">
                <input
                  placeholder="Search any location"
                  type="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-1 text-[14px] text-black placeholder:text-black/20 h-full px-5 focus:outline-none outline-none border-none"
                />
                <button
                  type="submit"
                  className="rounded-full w-8 h-8 flex items-center justify-center bg-primary"
                >
                  <FaSearch color="#fff" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default Navbar;
