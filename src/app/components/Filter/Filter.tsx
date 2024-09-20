"use client"
import React, { useContext } from 'react'
import FilterProperties from './FilterProperties'
import AddingApplicationsButtons from '../AddingApplicationsButtons'
import { globalContext } from '@/app/context/globalContext'
import CloseIcon from "../../assets/x.svg"
import Image from 'next/image'

const Filter = () => {
    const context = useContext(globalContext);

    const handlePriceRemoval = () => {
        context?.setMinPrice('');
        context?.setMaxPrice('');
    }
    const handleAreaRemoval = () => {
        context?.setMinArea('');
        context?.setMaxArea('');
    }

    const handleBedroomsRemoval = () => {
        context?.setSelectedBedrooms('');
    }

    const handleAllClear = () => {
        context?.setSelectedRegion([]);
        context?.setMinPrice('');
        context?.setMaxPrice('');
        context?.setMinArea('');
        context?.setMaxArea('');
        context?.setSelectedBedrooms('');
    }

    return (
        <div className='font-bold text-[16px]'>
            <FilterProperties />
            <div className='mt-5 flex gap-5'>
                {context?.selectedRegion.map((region) => (
                    <div className={`border-[1px] w-max ${context?.selectedRegion.length === 0 ? "hidden" : "block"} border-[#DBDBDB] py-[5px] px-[20px] flex gap-1 items-center justify-between rounded-[43px]`}>
                        <p>{region}</p>
                        <Image src={CloseIcon} alt='close' className='cursor-pointer' onClick={() => context?.setSelectedRegion(context?.selectedRegion.filter((item) => item !== region))} />
                    </div>
                ))}
                <div className={`border-[1px] w-max ${context?.minPrice.length === 0 && context?.maxPrice.length === 0 ? "hidden" : "block"} border-[#DBDBDB] py-[5px] px-[20px] flex gap-1 items-center justify-between rounded-[43px]`}>
                    <p>{context?.minPrice}₾ - {context?.maxPrice}₾</p>
                    <Image src={CloseIcon} alt='close' className='cursor-pointer' onClick={handlePriceRemoval} />
                </div>
                <div className={`border-[1px] w-max ${context?.minArea.length === 0 && context?.maxArea.length === 0 ? "hidden" : "block"} border-[#DBDBDB] py-[5px] px-[20px] flex gap-1 items-center justify-between rounded-[43px]`}>
                    <p>{context?.minArea} მ² - {context?.maxArea} მ²</p>
                    <Image src={CloseIcon} alt='close' className='cursor-pointer' onClick={handleAreaRemoval} />
                </div>
                <div className={`border-[1px] w-max ${context?.selectedBedrooms.length === 0 ? "hidden" : "block"} border-[#DBDBDB] py-[5px] px-[20px] flex gap-1 items-center justify-between rounded-[43px]`}>
                    <p>{context?.selectedBedrooms}</p>
                    <Image src={CloseIcon} alt='close' className='cursor-pointer' onClick={handleBedroomsRemoval} />
                </div>
                <p className={`flex items-center cursor-pointer ${context?.selectedRegion.length === 0 && context?.minPrice.length === 0 && context?.maxPrice.length === 0 && context?.minArea.length === 0 && context?.maxArea.length === 0 && context?.selectedBedrooms.length === 0 ? "hidden" : "block"
                    }`}
                    onClick={handleAllClear}
                >გასუფთავება</p>
            </div>
        </div>
    )
}

export default Filter