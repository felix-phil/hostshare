import Categories from "@/app/Categories";
import Image from "next/image";
import Listings from "./Listings";

export default function Home() {
  return (
    <main className="w-full max-w-[1600px] flex items-center flex-col h-full px-5 overflow-hidden">
      <div className="w-full">
        <Categories />
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto none-scrollbar w-full">
        <Listings />
      </div>
    </main>
  );
}
