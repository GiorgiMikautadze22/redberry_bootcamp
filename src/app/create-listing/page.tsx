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

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Bearer token (Replace <your-token> with the actual token)
            const token = '9d066257-f384-4952-b0a9-db8b4c7fb512';

            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/real-estates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Handle success (e.g., display success message, navigate, etc.)
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
            <form className="flex flex-col gap-[80px]" onSubmit={handleSubmit}>
                {/* <TransactionType formData={formData} setFormData={setFormData} />
                <Location formData={formData} setFormData={setFormData} />
                <ApartmentDetails formData={formData} setFormData={setFormData} />
                <ChoosingAgent formData={formData} setFormData={setFormData} /> */}
                <SubmitButton />
            </form>
        </div>
    );
};

export default Page;
