"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import DropDownIcon from '../../assets/Icon.svg'

const FilterArea: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [minArea, setMinArea] = useState('')
    const [maxArea, setMaxArea] = useState('')
    const [selectedMinArea, setSelectedMinArea] = useState('')
    const [selectedMaxArea, setSelectedMaxArea] = useState('')

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const areaOptions = ['50,000', '50,000', '50,000', '50,000', '50,000']

    return (
        <div className='relative'>
            <button
                className='hover:bg-[#F3F3F3] h-[35px] px-[10px] flex items-center justify-center rounded-[6px] transition-all cursor-pointer'
                onClick={toggleDropdown}
            >
                ფართობის მიხედვით
                <Image
                    src={DropDownIcon}
                    alt="dropdown-icon"
                    className={`${isOpen ? '' : 'rotate-180'} ml-2 transition-transform`}
                />
            </button>

            {isOpen && (
                <div className="w-[400px] p-[24px] border-[1px] border-[#DBDBDB] absolute top-[50px] left-[-5px] rounded-[10px] bg-white z-10 shadow-md">
                    <h3 className="mb-4 font-semibold text-lg">ფართობის მიხედვით</h3>
                    <div className="flex justify-between mb-4">
                        <div className="w-[45%] relative">
                            <input
                                type="text"
                                placeholder="დან"
                                value={minArea}
                                onChange={(e) => setMinArea(e.target.value)}
                                className="w-full p-2 pr-8 border border-gray-300 rounded-md"
                            />
                            <span className="absolute right-2 top-2 text-gray-500">მ²</span>
                        </div>
                        <div className="w-[45%] relative">
                            <input
                                type="text"
                                placeholder="მდე"
                                value={maxArea}
                                onChange={(e) => setMaxArea(e.target.value)}
                                className="w-full p-2 pr-8 border border-gray-300 rounded-md"
                            />
                            <span className="absolute right-2 top-2 text-gray-500">მ²</span>
                        </div>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="w-[45%]">
                            <p className="mb-2 font-medium">მინ. მ²</p>
                            {areaOptions.map((area, index) => (
                                <label key={`min-${index}`} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="minArea"
                                        value={area}
                                        checked={selectedMinArea === area}
                                        onChange={() => setSelectedMinArea(area)}
                                        className="mr-2"
                                    />
                                    {area} მ²
                                </label>
                            ))}
                        </div>
                        <div className="w-[45%]">
                            <p className="mb-2 font-medium">მაქს. მ²</p>
                            {areaOptions.map((area, index) => (
                                <label key={`max-${index}`} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name="maxArea"
                                        value={area}
                                        checked={selectedMaxArea === area}
                                        onChange={() => setSelectedMaxArea(area)}
                                        className="mr-2"
                                    />
                                    {area} მ²
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-[#FF4F37] text-white px-6 py-2 rounded-md hover:bg-[#E64632] transition-colors">
                            არჩევა
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterArea