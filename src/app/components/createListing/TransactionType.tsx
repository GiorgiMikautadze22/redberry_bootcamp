"use client"

import React, { useState } from 'react'

const TransactionType = () => {

    const [selectedOption, setSelectedOption] = useState('sale');

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
                        onChange={() => setSelectedOption('sale')}
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
                        onChange={() => setSelectedOption('rent')}
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
        </div>)
}

export default TransactionType