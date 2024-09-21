"use client";

import { globalContext } from '@/app/context/globalContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Agents } from "../../interfaces/interface";
import TrashIcon from "../../assets/trash-2.svg"
import CheckIcon from "../../assets/check.svg"
import Image from 'next/image';

const AddAgent = () => {
    const [agentData, setAgentData] = useState<Agents>({
        name: '',
        surname: '',
        email: '',
        phone: '',
        avatar: '',
    });

    const [errors, setErrors] = useState<{
        name?: string;
        surname?: string;
        email?: string;
        phone?: string;
        avatar?: string;
    }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAgentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (agentData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters long.';
        }
        if (agentData.surname.length < 2) {
            newErrors.surname = 'Surname must be at least 2 characters long.';
        }
        if (!/^\d+$/.test(agentData.phone)) {
            newErrors.phone = 'Phone must contain only numbers.';
        }
        if (agentData.phone.length !== 9) {
            newErrors.phone = 'Phone should be in this format 5XXXXXXXX.';
        }
        if (!agentData.phone.startsWith('5')) {
            newErrors.phone = 'Phone should be in this format 5XXXXXXXX.';
        }
        if (!agentData.email.endsWith('@redberry.ge')) {
            newErrors.email = 'Email should end with @redberry.ge';
        }
        if (!agentData.avatar) {
            newErrors.avatar = 'Please upload an image.';
        } else if (agentData.avatar instanceof File) {
            if (!agentData.avatar.type.startsWith('image/')) {
                newErrors.avatar = 'File must be an image.';
            } else if (agentData.avatar.size > 1024 * 1024) {
                newErrors.avatar = 'Image size must be less than 1MB.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validateForm();

        if (!isValid) {
            console.log("Form validation failed");
            return;
        }

        try {
            const token = '9d066257-f384-4952-b0a9-db8b4c7fb512';

            const formData = new FormData();
            formData.append('name', agentData.name);
            formData.append('surname', agentData.surname);
            formData.append('email', agentData.email);
            formData.append('phone', agentData.phone);
            if (agentData.avatar instanceof File) {
                formData.append('avatar', agentData.avatar);
            }

            console.log("Form data before sending:", Object.fromEntries(formData));

            const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/agents", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            setAgentData({
                name: '',
                surname: '',
                email: '',
                phone: '',
                avatar: '',
            });

            handleRemovePhoto();
            handleConsultButtonClose();

            if (response.ok) {
                console.log("Form submitted successfully");

                // Clear form data
                setAgentData({
                    name: '',
                    surname: '',
                    email: '',
                    phone: '',
                    avatar: '',
                });

                // Clear errors
                setErrors({});

                // Clear photo preview
                setPhotoPreview(null);

                // Close the popup
                handleConsultButtonClose();
            } else {
                console.error("Error submitting form:", await response.text());
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };



    const context = useContext(globalContext);
    const modalRef = useRef<HTMLDivElement>(null);

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleConsultButtonClose = () => {
        context?.setActivePopUp && context?.setActivePopUp(false);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            context?.setActivePopUp && context?.setActivePopUp(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            context?.setActivePopUp && context?.setActivePopUp(false);
        }
    };

    useEffect(() => {
        if (context?.activePopUp) {
            document.addEventListener("mousedown", handleOutsideClick);
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [context?.activePopUp]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setAgentData({
            ...agentData,
            avatar: file,
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
        setAgentData({
            ...agentData,
            avatar: null,
        });
        setPhotoPreview(null); // Clear the preview
    };

    return (
        <div className={`w-full h-full fixed bg-black/25 backdrop-blur-sm z-10  ${context?.activePopUp ? "block" : "hidden"}`}>
            <div
                className="fixed inset-0 top-1/2 left-1/2 z-10 bg-white flex flex-col gap-[60px] items-center justify-center p-[100px] w-[50%] rounded-[10px] h-[70%] -translate-x-1/2 -translate-y-1/2"
                ref={modalRef}
            >
                <h3 className="text-[#021526] text-[32px] font-bold">აგენტის დამატება</h3>
                <form action="POST" className="w-full" onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-[20px] w-full'>
                        <div>
                            <label htmlFor="name" className="block text-[14px] font-bold text-gray-700">სახელი</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={agentData.name}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                            />
                            {errors.name ?
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                :
                                <div className='flex gap-2 text-[14px]'>
                                    <Image src={CheckIcon} alt="check" />
                                    <p>მინიმუმ ორი სიმბოლო</p>
                                </div>
                            }
                        </div>
                        <div>
                            <label htmlFor="surname" className="block text-[14px] font-bold text-gray-700">გვარი</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={agentData.surname}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                            />
                            {errors.surname ?
                                <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
                                :
                                <div className='flex gap-2 text-[14px]'>
                                    <Image src={CheckIcon} alt="check" />
                                    <p>მინიმუმ ორი სიმბოლო</p>
                                </div>
                            }
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-[14px] font-bold text-gray-700">ელ-ფოსტა</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={agentData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                            />
                            {errors.email ?
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                :
                                <div className='flex gap-2 text-[14px]'>
                                    <Image src={CheckIcon} alt="check" />
                                    <p>გამოიყენეთ @redberry.ge ფოსტა</p>
                                </div>
                            }
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-[14px] font-bold text-gray-700">ტელეფონის ნომერი</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={agentData.phone}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                            />
                            {errors.phone ?
                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                :
                                <div className='flex gap-2 text-[14px]'>
                                    <Image src={CheckIcon} alt="check" />
                                    <p>მხოლოდ რიცხვები</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="mt-4 w-full">
                        <label htmlFor="avatar" className="block text-[14px] font-bold text-gray-700">ატვირთეთ ფოტო*</label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
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
                        {errors.avatar ?
                            <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                            :
                            <div className='flex gap-2 text-[14px]'>
                                <Image src={CheckIcon} alt="check" />
                                <p>არ უნდა აღემატებოდეს 1mb</p>
                            </div>
                        }

                    </div>
                    <div className="flex items-center justify-end gap-[16px] w-full mt-[50px]">
                        <div
                            className="border font-semibold cursor-pointer text-[#F93B1D] h-[47px] border-[#F93B1D] rounded-[10px] flex items-center justify-center gap-2 px-[15px]"
                            onClick={handleConsultButtonClose}
                        >
                            <p>გაუქმება</p>
                        </div>
                        <button
                            className="bg-[#F93B1D] font-semibold text-white h-[47px] border-[#F93B1D] rounded-[10px] flex items-center justify-center gap-2 px-[15px]"
                            type="submit"
                        >
                            <p>დაამატე აგენტი</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default AddAgent;
