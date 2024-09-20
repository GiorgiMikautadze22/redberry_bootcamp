"use client"
import React, { useContext, useEffect, useState } from 'react'
import DropDownIcon from '../../assets/Icon.svg'
import Image from 'next/image';
import { globalContext } from '@/app/context/globalContext';
import Listings from '../listings/Listings';

interface RegionState {
    [key: string]: boolean;
}

const ChooseRegion: React.FC = () => {


    const initialRegionsState: RegionState = {
        ქართლი: false,
        კახეთი: false,
        იმერეთი: false,
        სამეგრელო: false,
        გურია: false,
        რაჭა: false,
        აჭარა: false,
        სვანეთი: false,
        ლეჩხუმი: false,
        მცხეთა: false,
        'სამცხე-ჯავახეთი': false,
        თბილისი: false
    };

    const [selectedRegions, setSelectedRegions] = useState<RegionState>(initialRegionsState)


    const context = useContext(globalContext);


    const handleApplyFilter = () => {
        // Set selected regions in the global context
        const selectedRegionNames = Object.entries(selectedRegions)
            .filter(([_, isSelected]) => isSelected)
            .map(([region, _]) => region);

        context?.setSelectedRegion(selectedRegionNames);
        // Close the dropdown

        setSelectedRegions(initialRegionsState);

        context?.setIsOpen('');
    };


    const toggleDropdown = () => {
        if (context?.isOpen.length === 0 || context?.isOpen !== "region") {
            context?.setIsOpen('region')
        } else {
            context?.setIsOpen('')
        }
    }

    const handleCheckboxChange = (region: string) => {
        setSelectedRegions(prev => ({
            ...prev,
            [region]: !prev[region]
        }))
    }

    return (
        <div className='relative'>
            <button className='hover:bg-[#F3F3F3] h-[35px] px-[10px] flex items-center justify-center rounded-[6px] transition-all cursor-pointer' onClick={toggleDropdown}>
                რეგიონი
                <Image src={DropDownIcon} alt="dropdown-icon" className={`${context?.isOpen === "region" ? '' : 'rotate-180'}  ml-2 transition-transform`} />
            </button>

            {context?.isOpen === "region" && (
                <div className="w-[700px] p-[24px] border-[1px] border-[#DBDBDB] absolute top-[50px] left-[-5px] rounded-[10px] bg-white z-10 shadow-md">
                    <h3 className="mb-4 font-semibold text-lg">რეგიონის მიხედვით</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(selectedRegions).map(([region, isChecked]) => (
                            <label key={region} className="flex items-center space-x-2 cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isChecked}
                                        onChange={() => handleCheckboxChange(region)}
                                    />
                                    <div className={`w-5 h-5 border ${isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300'} rounded flex items-center justify-center`}>
                                        {isChecked && (
                                            <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span>{region}</span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="bg-[#FF4F37] text-white px-6 py-2 rounded-md hover:bg-[#E64632] transition-colors" onClick={handleApplyFilter}>
                            არჩევა
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChooseRegion