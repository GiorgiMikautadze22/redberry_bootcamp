"use client"
import { deleteListing, fetchListing, fetchListings } from '@/app/hooks/fetch';
import Image from 'next/image'
import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import { Listing } from '@/app/interfaces/interface';
import LocationIcon from "../../assets/location-marker.svg"
import AreaIcon from "../../assets/areaIcon.svg"
import BackArrow from "../../assets/backArrow.svg"
import BedIcon from "../../assets/bed.svg"
import PostIcon from "../../assets/Vector (1).svg"
import EmailIcon from "../../assets/email.svg"
import PhoneIcon from "../../assets/phone.svg"
import { globalContext } from '../../context/globalContext';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import Card from '@/app/components/listings/Card';


const page = ({ params }: { params: { slug: string } }) => {

    const [listing, setListing] = useState<Listing>({
        address: '',
        agent: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            avatar: '',
        },
        agent_id: 0,
        bedrooms: 0,
        city_id: 0,
        description: '',
        id: 0,
        image: '',
        created_at: '',
        city: {
            id: 0,
            name: '',
            region: {
                id: 0,
                name: '',
            },
            region_id: 0,
        },
        is_rental: 0,
        price: 0,
        zip_code: 0,
        area: 0,
    });
    const [filteredByRegion, setFilteredByRegion] = useState<any[]>([]);


    const router = useRouter();


    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromApi();
    }, []);


    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const singleListing = (await fetchListing(params.slug)) as Listing;
                setListing(singleListing);

                const allListings = (await fetchListings()) as any[];

                const filteredListings = allListings.filter((item) => item.city.region_id === singleListing.city.region_id);
                const withoutCurrentListing = filteredListings.filter((item) => item.id !== singleListing.id);
                setFilteredByRegion(withoutCurrentListing);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromApi();
    }, []);

    const handleDeletion = async () => {
        try {
            await deleteListing(params.slug);
            handlePopUpButtonClose()
            router.push('/');

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const context = useContext(globalContext);


    const handlePopUpActive = () => {
        context?.setAgentDelete && context?.setAgentDelete(true);
    };


    const handlePopUpButtonClose = () => {
        context?.setAgentDelete && context?.setAgentDelete(false);
    };


    const [swiper, setSwiper] = useState<any>(null);


    const goNext = () => {
        if (swiper) swiper.slideNext();
    };

    const goPrev = () => {
        if (swiper) swiper.slidePrev();
    };

    return (
        <div className='px-[150px]'>
            <div className={`w-full h-full fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-10 ${context?.agentDelete ? "block" : "hidden"}`}>
                <div className='w-[25%] h-[20%] bg-white rounded-[20px] flex flex-col items-center justify-center'>
                    <p className='text-[20px]'>გსურთ წაშალოთ ლისტინგი?</p>
                    <div>
                        <div className="flex items-center justify-end gap-[16px] w-full mt-[50px]">
                            <div
                                className="border font-semibold cursor-pointer text-[#F93B1D] h-[47px] border-[#F93B1D] rounded-[10px] flex items-center justify-center gap-2 px-[15px]"
                                onClick={handlePopUpButtonClose}
                            >
                                <p>გაუქმება</p>
                            </div>
                            <button
                                className="bg-[#F93B1D] font-semibold text-white h-[47px] border-[#F93B1D] rounded-[10px] flex items-center justify-center gap-2 px-[15px]"
                                type="button"
                                onClick={handleDeletion}
                            >
                                <p>დადასტურება</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-[70px] w-full items-center justify-start'>

                <div className='relative'>
                    <div className='absolute flex items-center justify-center bg-[#021526] bg-opacity-[50%] px-3 py-1 top-[60px] left-5 text-[12px] font-semibold rounded-[15px] text-white'>
                        <p>{listing.is_rental === 0 ? "იყიდება" : "ქირავდება"}</p>
                    </div>
                    <Image src={BackArrow} alt="backArrow" className='cursor-pointer mb-[20px]' onClick={() => router.push('/')} />
                    <Image src={listing.image || "https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png"} alt='listing' width={840} height={670} className='rounded-[10px] w-[840px] h-[670px]' objectFit='cover' />
                    <p className='w-full text-right mt-[5px] text-[#808A93]'>გამოქვეყნების თარიღი {new Date(listing.created_at).toLocaleDateString('en-US', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit',
                    })}</p>

                </div>
                <div>
                    <h1 className='text-[48px] font-bold'>{listing.price.toLocaleString('en-US')} ₾</h1>
                    <div className='flex flex-col gap-[5px] text-[#808A93] text-[16px]'>
                        <div className='flex gap-[10px] items-center'>
                            <Image src={LocationIcon} alt='location' width={15} height={15} />
                            <p>{listing.city.name + ", " + listing.address}</p>
                        </div>
                        <div className='flex gap-[10px] items-center' >
                            <Image src={AreaIcon} alt='area' width={15} height={15} />
                            <p>ფართი {listing.area} მ²</p>
                        </div>
                        <div className='flex gap-[10px] items-center'>
                            <Image src={BedIcon} alt='bed' width={15} height={15} />
                            <p>საძინებლები {listing.bedrooms}</p>
                        </div>
                        <div className='flex gap-[10px] items-center'>
                            <Image src={PostIcon} alt='post' width={15} height={15} />
                            <p>საფოსტო ინდექსი {listing.zip_code}</p>
                        </div>
                    </div>
                    <p className='text-[16px] text-[#808A93] mt-[30px]'>
                        {listing.description}
                    </p>
                    <div className='mt-[30px] p-[20px] border-[1px] border-[#E1E1E1] rounded-[10px]'>
                        <div className='flex gap-[10px] items-center'>
                            <Image src={listing.agent.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="avatar" width={72} height={72} className='rounded-full w-[72px] h-[72px]' objectFit='contain' />
                            <div>
                                <p>{listing.agent.name + " " + listing.agent.surname}</p>
                                <p className='text-[#676E76]'>აგენტი</p>
                            </div>
                        </div>
                        <div className='mt-[15px]'>
                            <div className='flex gap-[10px] items-center'>
                                <Image src={EmailIcon} alt="emaail" width={15} height={15} />
                                {
                                    <p className='text-[#808A93]'>{listing.agent.email}</p>
                                }
                            </div>
                            <div className='flex gap-[10px] items-center'>
                                <Image src={PhoneIcon} alt="phone" width={15} height={15} />
                                <p className='text-[#808A93]'>{listing.agent?.phone?.replace(/(\d{3})(?=\d)/g, '$1 ')}</p>
                            </div>
                        </div>
                    </div>
                    <button className='mt-[30px] border-[2px] border-[#676E76] rounded-[10px] text-[#676E76] font-semibold text-[16px] px-[20px] py-[10px]'
                        onClick={handlePopUpActive}
                    >
                        ლისტინგის წაშლა
                    </button>
                </div>
            </div>
            <div className={`${filteredByRegion.length === 0 ? "hidden" : "block"}`}>

                <h2 className='text-[32px] font-bold my-[30px]'>ბინები მსგავს ლოკაციაზე</h2>
                <div className="flex items-center justify-between mb-[50px]">
                    <Image
                        className="swiper-button-next absolute left-[100px] cursor-pointer max-w-[30px] max-h-[30px] xmd:mb-[70px]"
                        onClick={goPrev}
                        src={BackArrow}
                        alt={"next"}
                    />
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={30}
                        onSwiper={setSwiper}
                        className="mySwiper"
                    >
                        <div className='flex'>
                            {filteredByRegion.map((listing) => (
                                <SwiperSlide key={listing.id}>
                                    <Card listing={listing} />
                                </SwiperSlide>
                            ))}

                        </div>
                    </Swiper>
                    <Image
                        className="swiper-button-next absolute right-[100px] cursor-pointer max-w-[30px] rotate-180 max-h-[30px] xmd:mb-[70px]"
                        onClick={goNext}
                        src={BackArrow}
                        alt={"next"}
                    />
                </div>
            </div>

        </div >
    )
}

export default page