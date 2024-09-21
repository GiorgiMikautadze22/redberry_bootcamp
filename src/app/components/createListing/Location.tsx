"use client"
import React, { useEffect, useState } from 'react'
import CheckIcon from "../../assets/check.svg"
import Image from 'next/image';
import { fetchCities, fetchRegions } from '@/app/hooks/fetch';
import { Regions, Cities, FormData } from '@/app/interfaces/interface';

interface Props {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    errors: {
        price?: number,
        zip_code?: number,
        description?: string,
        area?: number,
        city_id?: number,
        region_id?: number,
        address?: string,
        agent_id?: number,
        bedrooms?: number,
        is_rental?: number,
        image?: string,
    };
}

const Location = ({ formData, setFormData, errors }: Props) => {


    const [regions, setRegions] = useState<Regions[]>([]);
    const [cities, setCities] = useState<Cities[]>([]);
    const [filteredCities, setFilteredCities] = useState<Cities[]>([]);

    useEffect(() => {
        if (formData.region_id) {
            const selectedRegion = regions.find((region) => region.id === Number(formData.region_id));

            if (selectedRegion) {
                const filtered = cities.filter((city) => city.region_id === selectedRegion.id);
                setFilteredCities(filtered);
            } else {
                setFilteredCities([]);
            }
        } else {
            setFilteredCities([]);
        }
    }, [formData.region_id, regions, cities]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;


        if (name === 'zip_code') {
            // Convert to number and validate
            const numValue = Number(value);
            if (!isNaN(numValue) && numValue >= 0) {
                setFormData({
                    ...formData,
                    [name]: numValue === 0 ? '' : numValue,
                });
            }
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: name === 'region_id' || name === 'city_id' ? Number(value) : value,
            }));
        }
    };

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const regionData = (await fetchRegions()) as Regions[];
                const cityData = await fetchCities() as Cities[];
                setCities(cityData);
                setRegions(regionData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromApi();
    }, []);


    // const [errors, setErrors] = useState<{
    //     address?: string;
    //     zipCode?: string;
    // }>({});




    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    // const validateForm = () => {
    //     const newErrors: { address?: string; zipCode?: string } = {};

    //     // Address validation (min 2 characters)
    //     if (formData.address.length < 2) {
    //         newErrors.address = 'Address must be at least 2 characters long.';
    //     }

    //     // ZIP code validation (only numbers)
    //     if (!/^\d+$/.test(formData.zipCode)) {
    //         newErrors.zipCode = 'ZIP code must contain only numbers.';
    //     }

    //     setErrors(newErrors);

    //     // Return true if there are no validation errors
    //     return Object.keys(newErrors).length === 0;
    // };



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
                    <label htmlFor="zip_code" className="block text-[14px] font-bold text-gray-700">ZIP კოდი*</label>
                    <input
                        required
                        type="text"
                        id="zip_code"
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                    />
                    {errors.zip_code ?
                        <p className="text-red-500 text-sm mt-1">{errors.zip_code}</p>
                        :
                        <div className='flex gap-2 text-[14px]'>
                            <Image src={CheckIcon} alt="check" />
                            <p>მხოლოდ რიცხვები</p>
                        </div>
                    }
                </div>

                {/* Region Select Input */}
                <div>
                    <label htmlFor="region_id" className="block text-[14px] font-bold text-gray-700">რეგიონი*</label>
                    <select
                        required
                        id="region_id"
                        name="region_id"
                        value={formData.region_id || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                    >
                        <option value="">აირჩიეთ რეგიონი</option>
                        {regions.map((region) => (
                            <option key={region.id} value={region.id}>
                                {region.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City Select Input */}
                <div>
                    <label htmlFor="city_id" className="block text-[14px] font-bold text-gray-700">ქალაქი*</label>
                    <select
                        required
                        id="city_id"
                        name="city_id"
                        value={formData.city_id || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                        disabled={!formData.region_id}
                    >
                        <option value="">აირჩიეთ ქალაქი</option>
                        {filteredCities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Location