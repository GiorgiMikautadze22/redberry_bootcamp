import Image from "next/image";
import Filter from "./components/Filter/Filter";
import Listings from "./components/listings/Listings";


export default function Home() {
  return (
    <div className="px-[162px] pt-[77px]">
      <Filter />
      <Listings />
    </div>
  );
}
