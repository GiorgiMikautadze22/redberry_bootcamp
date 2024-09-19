import Image from 'next/image'
import React from 'react'
import ListingImage from '../../assets/image.svg'
import LocationIcon from '../../assets/location-marker.svg'
import BedroomIcon from '../../assets/bed.svg'
import AreaIcon from '../../assets/areaIcon.svg'
import ZipCodeIcon from '../../assets/Vector (1).svg'
import Link from 'next/link'


interface Listing {
    id: number;
    address: string;
    zip_code: string;
    price: number;
    area: number;
    bedrooms: number;
    is_rental: number;
    image: string;
    city_id: number;
    city: {
        id: number;
        name: string;
        region_id: number;
        region: {
            id: number;
            name: string;
        }
    }
}

const Card = ({ listing }: { listing: Listing }) => {
    return (
        <Link href={`/single-listing/${listing.id}`} >
            <div className='relative border border-[#DBDBDB] rounded-[14px] hover:shadow-custom cursor-pointer transition-all'>
                <p className='absolute flex items-center justify-center bg-[#021526] bg-opacity-[50%] px-3 py-1 top-5 left-5 text-[12px] font-semibold rounded-[15px] text-white'>{listing.is_rental === 0 ? "იყიდება" : "ქირავდება"}</p>
                <Image src={listing.image} width={500} height={300} objectFit='fill' alt='Listing Image' className='object-cover h-[350px] rounded-t-[15px]' />
                <div className='p-[25px] text-[#021526] text-opacity-[70%]'>
                    <h3 className='text-[28px] font-bold'>{listing.price} ₾</h3>
                    <div className='flex items-center gap-2'>
                        <Image src={LocationIcon} alt='location-icon' width={15} height={15} />
                        <p>{listing.address}</p>
                    </div>
                    <div className='flex items-center gap-[25px] mt-[20px]'>
                        <div className='flex items-center gap-2'>
                            <Image src={BedroomIcon} alt='bedroom-icon' width={15} height={15} />

                            <p>{listing.bedrooms}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Image src={AreaIcon} alt='area-icon' width={15} height={15} />

                            <p>{listing.area} მ²</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Image src={ZipCodeIcon} alt='zip-icon' width={15} height={15} />
                            <p>{listing.zip_code}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card