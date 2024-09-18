"use client"

import React, { useState } from 'react'

interface FormData {
    is_rental: number;
    address: string;
    zip_code: string;
    region_id: number;
    city_id: number;
    apartmentDetails: string;
    agent: string;
}

interface Props {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const TransactionType = ({ formData, setFormData }: Props) => {
    const [selectedOption, setSelectedOption] = useState('sale'); // default selection

    const handleOptionChange = (option: 'sale' | 'rent', value: number) => {
        setSelectedOption(option);
        console.log("is_rental ", value)
        setFormData({
            ...formData,
            is_rental: value,  // setting the correct value based on selection
        });
    };

    return (
        <div>
            <p className='text-[16px] font-medium font-helveticaNeue uppercase'>გარიგების ტიპი</p>
            <div className='flex gap-[50px] mt-4'>
                {/* Sale Option */}
                <div className='flex items-center gap-2'>
                    <input
                        type="radio"
                        name="transactionType"
                        value={0}
                        checked={selectedOption === 'sale'}
                        onChange={() => handleOptionChange('sale', 0)}  // sale = 0
                        className="hidden"
                        id="sale"
                    />
                    <label
                        htmlFor="sale"
                        className={`cursor-pointer w-[18px] h-[18px]  border-2 border-[black] rounded-full flex items-center justify-center ${selectedOption === 'sale' ? 'bg-[white]' : ''
                            }`}
                    >
                        {selectedOption === 'sale' && (
                            <div className='w-[8px] h-[8px] bg-black rounded-full'></div>
                        )}
                    </label>
                    <p className='text-[#021526]'>იყიდება</p>
                </div>

                {/* Rent Option */}
                <div className='flex items-center gap-2'>
                    <input
                        type="radio"
                        name="transactionType"
                        value={1}
                        checked={selectedOption === 'rent'}
                        onChange={() => handleOptionChange('rent', 1)}  // rent = 1
                        className="hidden"
                        id="rent"
                    />
                    <label
                        htmlFor="rent"
                        className={`cursor-pointer w-[18px] h-[18px]  border-2 border-[black] rounded-full flex items-center justify-center ${selectedOption === 'sale' ? 'bg-[white]' : ''
                            }`}
                    >
                        {selectedOption === 'rent' && (
                            <div className='w-[8px] h-[8px] bg-black rounded-full'></div>
                        )}
                    </label>
                    <p className='text-[#021526]'>ქირავდება</p>
                </div>
            </div>
        </div>
    );
};

export default TransactionType;
