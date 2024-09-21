"use client"
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import DropDownIcon from '../../assets/Icon.svg'
import { globalContext } from '@/app/context/globalContext'

const FilterPrice: React.FC = () => {
    const [selectedMinPrice, setSelectedMinPrice] = useState('')
    const [selectedMaxPrice, setSelectedMaxPrice] = useState('')

    const context = useContext(globalContext);

    const toggleDropdown = () => {
        if (context?.isOpen.length === 0 || context?.isOpen !== "price") {
            context?.setIsOpen('price')
        } else {
            context?.setIsOpen('')
        }
    }

    const handleApplyFilter = () => {
        context?.setMinPrice(selectedMinPrice);
        context?.setMaxPrice(selectedMaxPrice);

        localStorage.setItem('minPrice', JSON.stringify(selectedMinPrice));
        localStorage.setItem('maxPrice', JSON.stringify(selectedMaxPrice));


        setSelectedMaxPrice('')
        setSelectedMaxPrice('');

        // Close the dropdown
        context?.setIsOpen('');
    }

    const priceOptions = ['50,000', '100,000', '150,000', '200,000', '300,000']

    return (
        <div className='relative'>
            <button
                className='hover:bg-[#F3F3F3] h-[35px] px-[10px] flex items-center justify-center rounded-[6px] transition-all cursor-pointer'
                onClick={toggleDropdown}
            >
                ფასის მიხედვით
                <Image
                    src={DropDownIcon}
                    alt="dropdown-icon"
                    className={`${context?.isOpen === "price" ? '' : 'rotate-180'} ml-2 transition-transform`}
                />
            </button>

            {context?.isOpen === "price" && (
                <div className="w-[400px] p-[24px] border-[1px] border-[#DBDBDB] absolute top-[50px] left-[-5px] rounded-[10px] bg-white z-10 shadow-md">
                    <h3 className="mb-4 font-semibold text-lg">ფასის მიხედვით</h3>
                    <div className="flex justify-between mb-4">
                        <div className="w-[45%]">
                            <input
                                type="text"
                                placeholder="დან"
                                value={selectedMinPrice}
                                onChange={(e) => setSelectedMinPrice(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="w-[45%]">
                            <input
                                type="text"
                                placeholder="მდე"
                                value={selectedMaxPrice}
                                onChange={(e) => setSelectedMaxPrice(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="w-[45%]">
                            <p className="mb-2 font-medium">მინ. ფასი</p>
                            {priceOptions.map((price) => (
                                <label key={`min-${price}`} className="flex items-center mb-2">
                                    {price} ₾
                                </label>
                            ))}
                        </div>
                        <div className="w-[45%]">
                            <p className="mb-2 font-medium">მაქს. ფასი</p>
                            {priceOptions.map((price) => (
                                <label key={`max-${price}`} className="flex items-center mb-2">
                                    {price} ₾
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-[#FF4F37] text-white px-6 py-2 rounded-md hover:bg-[#E64632] transition-colors"
                            onClick={handleApplyFilter}
                        >
                            არჩევა
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterPrice
