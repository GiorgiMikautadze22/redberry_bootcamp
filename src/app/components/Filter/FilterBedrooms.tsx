"use client"
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import DropDownIcon from '../../assets/Icon.svg'
import { globalContext } from '../../context/globalContext'


const FilterBedrooms: React.FC = () => {
    // const [isOpen, setIsOpen] = useState(false)
    const [bedroomCount, setBedroomCount] = useState('')

    const context = useContext(globalContext);

    const handleApplyFilter = () => {
        // Set the selected min and max price in the global context
        context?.setSelectedBedrooms(bedroomCount);

        localStorage.setItem('selectedBedrooms', JSON.stringify(bedroomCount));


        setBedroomCount('')

        // Close the dropdown
        context?.setIsOpen('');
    }


    const toggleDropdown = () => {
        if (context?.isOpen.length === 0 || context?.isOpen !== "bedrooms") {
            context?.setIsOpen('bedrooms')
        } else {
            context?.setIsOpen('')
        }
    }

    return (
        <div className='relative'>
            <button
                className='hover:bg-[#F3F3F3] h-[35px] px-[10px] flex items-center justify-center rounded-[6px] transition-all cursor-pointer'
                onClick={toggleDropdown}
            >
                საძინებლების რაოდენობა
                <Image
                    src={DropDownIcon}
                    alt="dropdown-icon"
                    className={`${context?.isOpen === "bedrooms" ? '' : 'rotate-180'} ml-2 transition-transform`}
                />
            </button>

            {context?.isOpen === "bedrooms" && (
                <div className="w-[400px] p-[24px] border-[1px] border-[#DBDBDB] absolute top-[50px] left-[-5px] rounded-[10px] bg-white z-10 shadow-md">
                    <h3 className="mb-4 font-semibold text-lg">საძინებლების რაოდენობა</h3>
                    <div className="mb-4">
                        <input
                            type="number"
                            value={bedroomCount}
                            onChange={(e) => setBedroomCount(e.target.value)}
                            className="w-[80px] p-2 border border-gray-300 rounded-md text-center text-lg"
                            min="1"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-[#FF4F37] text-white px-6 py-2 rounded-md hover:bg-[#E64632] transition-colors" onClick={handleApplyFilter}>
                            არჩევა
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterBedrooms