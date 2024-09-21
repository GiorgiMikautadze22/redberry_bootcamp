"use client"
import React, { useState } from 'react';
import ApartmentDetails from "../components/createListing/ApartmentDetails";
import Location from "../components/createListing/Location";
import ChoosingAgent from "../components/createListing/ChoosingAgent";
import TransactionType from "../components/createListing/TransactionType";
import SubmitButton from "../components/createListing/SubmitButton";
import { useRouter } from 'next/navigation';




const Page = () => {
    const [formData, setFormData] = useState<any>({
        price: '',
        zip_code: "",
        description: '',
        area: '',
        city_id: '',
        region_id: '',
        address: '',
        agent_id: '',
        bedrooms: '',
        is_rental: 0,
        image: '',
    });

    const [errors, setErrors] = useState<{
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
    }>({});

    const router = useRouter();




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
        if (!/^\d+$/.test(formData.zip_code.toString())) {
            newErrors.price = 'Zip code must contain only numbers.';
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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateForm();


        if (!isValid) {
            console.log("Form validation failed");
            return;
        }

        try {
            const token = '9d066257-f384-4952-b0a9-db8b4c7fb512';

            const newFormData = new FormData();
            newFormData.append('address', formData.address);
            newFormData.append('agent_id', formData.agent_id.toString());
            newFormData.append('area', formData.area.toString());
            newFormData.append('bedrooms', formData.bedrooms.toString());
            newFormData.append('city_id', formData.city_id.toString());
            newFormData.append('description', formData.description);
            newFormData.append('is_rental', formData.is_rental.toString());
            newFormData.append('price', formData.price.toString());
            newFormData.append('region_id', formData.region_id.toString());
            newFormData.append('zip_code', formData.zip_code);
            if (formData.image instanceof File) {
                newFormData.append('image', formData.image);
            }

            const response = await fetch("https://api.real-estate-manager.redberryinternship.ge/api/real-estates", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: newFormData,
            });


            if (response.ok) {
                console.log("Form submitted successfully");
                router.push('/');
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
