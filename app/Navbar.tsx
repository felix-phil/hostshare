"use client";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch, FaGlobe } from "react-icons/fa";
import { MdMenu, MdSearch } from "react-icons/md";
import { motion } from "framer-motion";
import moment from "moment";
const routesToHide = ["/rooms"];

const Navbar = () => {
  const pathname = usePathname();
  const hideInRoute = routesToHide.some((path) => pathname?.startsWith(path));
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [inputValues, setInputValues] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const dateCheckInRef = useRef<HTMLInputElement>(null);
  const dateCheckOutRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [guestDropdown, setGuestDropdown] = useState(false);

  const handleOutSideClick = (e: any) => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      divRef.current &&
      !divRef.current.contains(e.target)
    ) {
      setShowSearch(false);
      setActiveSearchTab(undefined);
      setGuestDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  });
  const handleOutsideTabClick = (e: any) => {
    if (tabRef.current && !tabRef.current.contains(e.target)) {
      setActiveSearchTab(undefined);
      setGuestDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideTabClick);
    return () => {
      document.removeEventListener("click", handleOutsideTabClick);
    };
  });
  const handleOutsideDropdownClick = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setGuestDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideDropdownClick);
    return () => {
      document.removeEventListener("click", handleOutsideDropdownClick);
    };
  });
  const onSearchHandler = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    router.push(`/?q=${searchText.trim()}`);
    setShowSearch(false);
    setActiveSearchTab(undefined);
  };
  const [activeSearchTab, setActiveSearchTab] = useState<
    "text" | "date_check_in" | "date_check_out" | "guest"
  >();
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
          <div className="absolute px-2 top-0 w-full flex items-center flex-col bg-white py-8">
            <div
              ref={tabRef}
              className={`relative w-full max-w-4xl md:h-[70px] flex flex-col md:flex-row items-center rounded-lg py-2 md:py-0 md:rounded-full justify-between border-black border-opacity-30 ${
                activeSearchTab !== undefined
                  ? "bg-black/10"
                  : "border bg-white"
              }`}
            >
              {/* Search Bar */}
              <div
                onClick={() => setActiveSearchTab("text")}
                className={`w-full md:w-[40%] flex flex-col justify-center pl-[5%] pt-2 gap-y-1 rounded-full h-full ${
                  activeSearchTab === "text"
                    ? "bg-white shadow-lg z-10"
                    : "hover:bg-black/10"
                }`}
              >
                <form onSubmit={onSearchHandler} className="w-full">
                  <h5 className="font-semibold text-[10px]">Where</h5>
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search destinations"
                    type="text"
                    className="bg-transparent placeholder:text-gray-500 text-black text-[13px] font-light outline-none focus:outline-none border-none"
                  />
                  <button type="submit" className="invisible"></button>
                </form>
              </div>
              {/* Check in */}
              <div
                onClick={() => {
                  setActiveSearchTab("date_check_in");
                  if (dateCheckInRef?.current?.showPicker)
                    dateCheckInRef?.current?.showPicker();
                }}
                className={`md:w-[15%] w-full  pt-2 pl-[5%] md:pl-0 flex flex-col gap-y-1 justify-center md:items-center rounded-full h-full ${
                  activeSearchTab === "date_check_in"
                    ? "bg-white shadow-xl z-10"
                    : "hover:bg-black/10"
                }`}
              >
                <h5 className="font-semibold text-[10px]">Check in</h5>
                <h5 className="bg-transparent text-gray-500 text-[13px] font-light">
                  {inputValues.checkIn
                    ? `${moment(inputValues.checkIn).format("MMM - DD")}`
                    : "Add Date"}
                </h5>
                <input
                  min={new Date().toISOString()}
                  onChange={(e) =>
                    setInputValues((prev) => ({
                      ...prev,
                      checkIn: e.target.value,
                    }))
                  }
                  ref={dateCheckInRef}
                  type="date"
                  color="#fff"
                  className="opacity-0 invisible w-0 h-0"
                  placeholder="Select date"
                />
              </div>
              {/* Check out */}
              <div
                onClick={() => {
                  setActiveSearchTab("date_check_out");
                  if (dateCheckOutRef?.current?.showPicker)
                    dateCheckOutRef?.current?.showPicker();
                }}
                className={`md:w-[15%] w-full relative pt-2 pl-[5%] md:pl-0 flex flex-col gap-y-1 md:items-center justify-center rounded-full h-full ${
                  activeSearchTab === "date_check_out"
                    ? "bg-white shadow-xl z-10"
                    : "hover:bg-black/10"
                }`}
              >
                <h5 className="font-semibold text-[10px]">Check out</h5>
                <h5 className="bg-transparent text-gray-500 text-[13px] font-light">
                  {inputValues.checkOut
                    ? `${moment(inputValues.checkOut).format("MMM - DD")}`
                    : "Add Date"}
                </h5>
                <input
                  ref={dateCheckOutRef}
                  onChange={(e) =>
                    setInputValues((prev) => ({
                      ...prev,
                      checkOut: e.target.value,
                    }))
                  }
                  type="date"
                  color="#fff"
                  className="opacity-0 invisible w-0 h-0"
                  placeholder="Select date"
                />
              </div>

              <div
                onClick={() => {
                  setActiveSearchTab("guest");
                  setGuestDropdown(true);
                }}
                className={`w-full md:w-[30%] relative flex flex-row pl-[5%] md:pl-[3%] py-2 pr-2 justify-between md:items-center rounded-full h-full ${
                  activeSearchTab === "guest"
                    ? "bg-white shadow-xl z-10"
                    : "hover:bg-black/10"
                }`}
              >
                <div className="">
                  <h5 className="font-semibold text-[10px]">Who</h5>
                  <h5 className="bg-transparent text-gray-500 text-[13px] font-light">
                    {inputValues.guests && inputValues.guests > 0
                      ? `${inputValues.guests} ${
                          inputValues.guests > 1 ? "guests" : "guest"
                        }`
                      : "Add guest"}
                  </h5>
                </div>
                <button
                  onClick={() => onSearchHandler()}
                  className={`${
                    activeSearchTab === "guest"
                      ? "px-2 md:px-6"
                      : "px-2 md:px-4"
                  } py-2 md:py-4 rounded-full flex flex-row items-center gap-x-2 bg-gradient-to-br font-bold text-[14px] text-white from-primary to-primary/50`}
                >
                  <MdSearch size={20} className="fill-white" />{" "}
                  {activeSearchTab === "guest" && <h4 className="">Search</h4>}
                </button>

                {guestDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute overflow-y-auto none-scrollbar divide-opacity-30 shadow-xl h-[200px] w-full max-w-sm z-50 bottom-[-300%] right-0 bg-white rounded-xl"
                  >
                    <ul className="w-full flex flex-col divide-y divide-black divide-opacity-10">
                      {Array.from({ length: 15 }).map((elm, index) => (
                        <li
                          onClick={() => {
                            setInputValues((prev) => ({
                              ...prev,
                              guests: index + 1,
                            }));
                            setGuestDropdown(false);
                          }}
                          key={index}
                          className="cursor-pointer py-3 text-[14px] hover:bg-slate-200 px-5"
                        >
                          {index + 1} guest
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

{
  /* <form
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
</form>; */
}
export default Navbar;
