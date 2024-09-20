"use client"
import React, { useContext } from 'react'
import FilterProperties from './FilterProperties'
import AddingApplicationsButtons from '../AddingApplicationsButtons'
import { globalContext } from '@/app/context/globalContext'
import CloseIcon from "../../assets/x.svg"
import Image from 'next/image'

const Filter = () => {
    const context = useContext(globalContext);

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
            </div>
        </div>
    )
}

export default Filter