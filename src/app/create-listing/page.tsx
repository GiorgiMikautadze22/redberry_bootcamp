import ApartmentDetails from "../components/createListing/ApartmentDetails";
import Location from "../components/createListing/Location";
import TransactionType from "../components/createListing/TransactionType";

const Page = () => {

    return (
        <div className='px-[20%] font-firaGo'>
            <h2 className='w-full flex items-center justify-center text-[32px] font-bold mb-[60px]'>ლისტინგის დამატება</h2>
            <form className="flex flex-col gap-[80px]">
                <TransactionType />
                <Location />
                <ApartmentDetails />
            </form>
        </div>
    );
};

export default Page;
