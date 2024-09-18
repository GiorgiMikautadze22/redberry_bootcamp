"use client"
import React, { useState } from 'react';
import ApartmentDetails from "../components/createListing/ApartmentDetails";
import Location from "../components/createListing/Location";
import ChoosingAgent from "../components/createListing/ChoosingAgent";
import TransactionType from "../components/createListing/TransactionType";
import SubmitButton from "../components/createListing/SubmitButton";
import { FormData } from '@/app/interfaces/interface';

const Page = () => {
    // State to store form data
    const [formData, setFormData] = useState<FormData>({
        price: 0,
        zip_code: "",
        description: '',
        area: 0,
        city_id: 0,
        region_id: 0,
        address: '',
        agent_id: 0,
        bedrooms: 0,
        is_rental: 0,
        image: '',
    });

    const [errors, setErrors] = useState<{
        price?: number,
        zip_code?: string,
        description?: string,
        area?: number,
        city_id?: number,
        region_id?: number,
        address?: string,
        agent_id?: number,
        bedrooms?: number,
        is_rental?: number,
        image?: string,
    }>({});


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};



        if (formData.address.length < 2) {
            newErrors.address = 'Address must be at least 2 characters long.';
        }
        const wordCount = formData.description.trim().split(/\s+/).length; // Trims extra spaces and splits by whitespace
        if (wordCount < 5) {
            newErrors.description = 'Description must be at least 5 words long.';
        }
        if (!/^\d+$/.test(formData.price.toString())) {
            newErrors.price = 'Price must contain only numbers.';
        }
        if (!/^\d+$/.test(formData.area.toString())) {
            newErrors.area = 'Area must contain only numbers.';
        }
        if (!/^\d+$/.test(formData.bedrooms.toString())) {
            newErrors.bedrooms = 'Bedroom must contain only whole numbers.';
        }
        if (!formData.image) {
            newErrors.image = 'Please upload an image.';
        } else if (formData.image instanceof File) {
            if (!formData.image.type.startsWith('image/')) {
                newErrors.image = 'File must be an image.';
            } else if (formData.image.size > 1024 * 1024) {
                newErrors.image = 'Image size must be less than 1MB.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            console.log("Form validation failed");
            return;
        }

        try {
            const token = '9d066257-f384-4952-b0a9-db8b4c7fb512';


            console.log("Form data before sending:", formData);

            const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/real-estates", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });


            if (response.ok) {
                console.log("Form submitted successfully");
            } else {
                // Handle error
                console.error("Error submitting form");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='px-[20%] font-firaGo pb-[50px]'>
            <h2 className='w-full flex items-center justify-center text-[32px] font-bold mb-[60px]'>ლისტინგის დამატება</h2>
            <form className="flex flex-col gap-[80px]" onSubmit={handleSubmit} action="POST">
                <TransactionType formData={formData} setFormData={setFormData} />
                <Location formData={formData} setFormData={setFormData} errors={errors} />
                <ApartmentDetails formData={formData} setFormData={setFormData} errors={errors} />
                <ChoosingAgent formData={formData} setFormData={setFormData} />
                <SubmitButton />
            </form>
        </div>
    );
};

export default Page;
