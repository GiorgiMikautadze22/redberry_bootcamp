"use client"
import React, { useState } from 'react'
import CheckIcon from "../../assets/check.svg"
import Image from 'next/image';

const Location = () => {

    const [formData, setFormData] = useState({
        address: '',
        zipCode: '',
        region: '',
        city: ''
    });



    const [errors, setErrors] = useState<{
        address?: string;
        zipCode?: string;
    }>({});

    const [cities, setCities] = useState<string[]>([]);
    const regions: { [key: string]: string[] } = {
        'Region 1': ['City 1-1', 'City 1-2', 'City 1-3'],
        'Region 2': ['City 2-1', 'City 2-2'],
        'Region 3': ['City 3-1', 'City 3-2', 'City 3-3', 'City 3-4'],
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'region') {
            setCities(regions[value] || []);
            setFormData({ ...formData, region: value, city: '' });
        }
    };

    const validateForm = () => {
        const newErrors: { address?: string; zipCode?: string } = {};

        // Address validation (min 2 characters)
        if (formData.address.length < 2) {
            newErrors.address = 'Address must be at least 2 characters long.';
        }

        // ZIP code validation (only numbers)
        if (!/^\d+$/.test(formData.zipCode)) {
            newErrors.zipCode = 'ZIP code must contain only numbers.';
        }

        setErrors(newErrors);

        // Return true if there are no validation errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form
        if (validateForm()) {
            console.log(formData);
            // Proceed with form submission (e.g., API call)
        } else {
            console.log('Validation errors', errors);
        }
    };

    return (
        <div>
            <p className='text-[16px] font-medium font-helveticaNeue uppercase'>მდებარეობა</p>
            <div className='grid grid-cols-2 gap-[20px] mt-[22px]'>

                {/* Address Input */}
                <div>
                    <label htmlFor="address" className="block text-[14px] font-bold text-gray-700">მისამართი*</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                    />

                    {errors.address ?
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        :
                        <div className='flex gap-2 text-[14px]'>
                            <Image src={CheckIcon} alt="check" />
                            <p>მინიმუმ ორი სიმბოლო</p>
                        </div>
                    }

                </div>

                {/* Zip Code Input */}
                <div>
                    <label htmlFor="zipCode" className="block text-[14px] font-bold text-gray-700">ZIP კოდი*</label>
                    <input
                        required
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                    />
                    {errors.zipCode ?
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                        :
                        <div className='flex gap-2 text-[14px]'>
                            <Image src={CheckIcon} alt="check" />
                            <p>მხოლოდ რიცხვები</p>
                        </div>
                    }
                </div>

                {/* Region Select Input */}
                <div>
                    <label htmlFor="region" className="block text-[14px] font-bold text-gray-700">რეგიონი*</label>
                    <select
                        required
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                    >
                        <option value="">აირჩიეთ რეგიონი</option>
                        {Object.keys(regions).map((region) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City Select Input */}
                <div>
                    <label htmlFor="city" className="block text-[14px] font-bold text-gray-700">ქალაქი*</label>
                    <select
                        required
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                        disabled={!formData.region}
                    >
                        <option value="">აირჩიეთ ქალაქი</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Location