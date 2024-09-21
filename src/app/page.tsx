import AddingApplicationsButtons from "./components/AddingApplicationsButtons";
import Filter from "./components/Filter/Filter";
import AddAgent from "./components/addAgent/AddAgent";
import Listings from "./components/listings/Listings";


export default function Home() {
  return (
    <div className="px-[162px] mb-[50px]">
      <div className="flex items-center w-full justify-between">
        <Filter />
        <AddingApplicationsButtons />
      </div>
      <Listings />
    </div>
  );
}
