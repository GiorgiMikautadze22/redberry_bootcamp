"use client"
import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { fetchListings } from '@/app/hooks/fetch';
import { globalContext } from '@/app/context/globalContext';



const Listings = () => {


    const context = useContext(globalContext);




    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const data = (await fetchListings()) as any[];
                context?.setListings(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromApi();
    }, []);

    return (
        <div className='grid grid-cols-4 gap-10 w-full h-max items-center justify-between mt-[50px]'>
            {context?.filteredListings.map((listing) => (
                <Card key={listing.id} listing={listing} />
            ))}
        </div>
    )
}

export default Listings