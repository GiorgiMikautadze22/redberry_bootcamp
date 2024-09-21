"use client"
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import TrashIcon from "../../assets/trash-2.svg"
import CheckIcon from "../../assets/check.svg"
import { FormData } from '@/app/interfaces/interface';

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

const ApartmentDetails = ({ formData, setFormData, errors }: Props) => {

    const [photoPreview, setPhotoPreview] = useState<string | null>(null); // To hold the photo preview URL

    const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref to access the file input

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'price' || name === 'area' || name === 'bedrooms') {
            // Convert to number and validate
            const numValue = Number(value);
            if (!isNaN(numValue) && numValue >= 0) {
                setFormData(prevData => ({
                    ...prevData,
                    [name]: numValue === 0 ? '' : numValue,
                }));
            }
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData({
            ...formData,
            image: file,
        });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string); // Set the photo preview URL
            };
            reader.readAsDataURL(file); // Read the file to get its URL
        } else {
            setPhotoPreview(null); // Reset if no file is selected
        }
    };

    const handleUploadClick = () => {
        // Trigger the hidden file input's click event
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRemovePhoto = () => {
        setFormData({
            ...formData,
            image: null,
        });
        setPhotoPreview(null); // Clear the preview
    };

    return (
        <div>
            <div className='grid grid-cols-2 gap-[20px] mt-[22px]'>
                <div>
                    <label htmlFor="price" className="block text-[14px] font-bold text-gray-700">ფასი</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                    />
                    {errors.price ?
                        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                        :
                        <div className='flex gap-2 text-[14px]'>
                            <Image src={CheckIcon} alt="check" />
                            <p>მხოლოდ რიცხვები</p>
                        </div>
                    }
                </div>
                <div>
                    <label htmlFor="area" className="block text-[14px] font-bold text-gray-700">ფართობი</label>
                    <input
                        type="text"
                        id="area"
                        name="area"
                        required
                        value={formData.area}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                    />
                    {errors.area ?
                        <p className="text-red-500 text-sm mt-1">{errors.area}</p>
                        :
                        <div className='flex gap-2 text-[14px]'>
                            <Image src={CheckIcon} alt="check" />
                            <p>მხოლოდ რიცხვები</p>
                        </div>
                    }
                </div>
                <div>
                    <label htmlFor="bedrooms" className="block text-[14px] font-bold text-gray-700">საძინებლები</label>
                    <input
                        type="text"
                        id="bedrooms"
                        name="bedrooms"
                        required
                        value={formData.bedrooms}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                    />
                    {errors.bedrooms ?
                        <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>
                        :
                        <div className='flex gap-2 text-[14px]'>
                            <Image src={CheckIcon} alt="check" />
                            <p>მხოლოდ რიცხვები</p>
                        </div>
                    }
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-[14px] font-bold text-gray-700">აღწერა*</label>
                <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-[#808A93] rounded-md h-[135px]"
                />
                {errors.description ?
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    :
                    <div className='flex gap-2 text-[14px]'>
                        <Image src={CheckIcon} alt="check" />
                        <p>მინიმუმ 5 სიტყვა</p>
                    </div>
                }
            </div>

            {/* Photo Upload */}
            <div className="mt-4 w-full">
                <label htmlFor="photo" className="block text-[14px] font-bold text-gray-700">ატვირთეთ ფოტო*</label>
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    required
                    ref={fileInputRef} // Bind the ref to the file input
                    onChange={handlePhotoChange}
                    className="mt-1 w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md hidden" // Keep it hidden
                />

                {/* Clickable div to trigger file upload */}
                <div className={`w-full ${photoPreview ? "h-auto" : "h-[120px]"} flex items-center justify-center border border-dashed border-black rounded-[8px] mt-2`}>



                    {/* Display the photo preview */}
                    {photoPreview ? (
                        <div className="my-4 relative">
                            <Image
                                src={photoPreview}
                                alt="Photo Preview"
                                width={200}
                                height={200}
                                className="w-[200px] h-auto object-cover rounded-md border border-[#808A93]"
                            />
                            <div className='w-[30px] bg-white h-[30px] rounded-full border border-black flex justify-center items-center cursor-pointer absolute right-[-10px] bottom-[-10px]'
                                onClick={handleRemovePhoto}
                            >
                                <Image src={TrashIcon} alt='trash-icon' width={20} height={20} />
                            </div>
                        </div>
                    ) :
                        <div
                            className='w-[24px] h-[24px] rounded-full border border-black flex justify-center items-center cursor-pointer'
                            onClick={handleUploadClick} // Trigger the file input click on div click
                        >
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 7.41439H7.91665V11.9977C7.91665 12.2408 7.82007 12.474 7.64816 12.6459C7.47625 12.8178 7.24309 12.9144 6.99998 12.9144C6.75686 12.9144 6.52371 12.8178 6.3518 12.6459C6.17989 12.474 6.08331 12.2408 6.08331 11.9977V7.41439H1.49998C1.25686 7.41439 1.02371 7.31781 0.851799 7.1459C0.67989 6.97399 0.583313 6.74084 0.583313 6.49772C0.583313 6.25461 0.67989 6.02145 0.851799 5.84954C1.02371 5.67763 1.25686 5.58105 1.49998 5.58105H6.08331V0.997721C6.08331 0.754606 6.17989 0.521448 6.3518 0.34954C6.52371 0.177632 6.75686 0.0810547 6.99998 0.0810547C7.24309 0.0810547 7.47625 0.177632 7.64816 0.34954C7.82007 0.521448 7.91665 0.754606 7.91665 0.997721V5.58105H12.5C12.7431 5.58105 12.9763 5.67763 13.1482 5.84954C13.3201 6.02145 13.4166 6.25461 13.4166 6.49772C13.4166 6.74084 13.3201 6.97399 13.1482 7.1459C12.9763 7.31781 12.7431 7.41439 12.5 7.41439Z" fill="black" />
                            </svg>
                        </div>
                    }

                </div>
                {errors.image ?
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                    :
                    <div className='flex gap-2 text-[14px]'>
                        <Image src={CheckIcon} alt="check" />
                        <p>არ უნდა აღემატებოდეს 1mb</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default ApartmentDetails;
