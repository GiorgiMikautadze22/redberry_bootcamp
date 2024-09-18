"use client"
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { fetchListings } from '@/app/hooks/fetch';

// const data = [
//     {
//         id: 1,
//         address: "შარტავას 2ა",
//         zip_code: "0101",
//         price: 100000,
//         area: 100.5,
//         bedrooms: 3,
//         is_rental: 0,
//         image: "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
//         city_id: 1,
//         city: {
//             id: 1,
//             name: "სოხუმი",
//             region_id: 1,
//             region: {
//                 id: 1,
//                 name: "აფხაზეთი"
//             }
//         }
//     },
//     {
//         id: 2,
//         address: "შარტავას 2ა",
//         zip_code: "0101",
//         price: 100000,
//         area: 100.5,
//         bedrooms: 3,
//         is_rental: 0,
//         image: "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
//         city_id: 1,
//         city: {
//             id: 1,
//             name: "სოხუმი",
//             region_id: 1,
//             region: {
//                 id: 1,
//                 name: "აფხაზეთი"
//             }
//         }
//     },
//     {
//         id: 3,
//         address: "შარტავას 2ა",
//         zip_code: "0101",
//         price: 100000,
//         area: 100.5,
//         bedrooms: 3,
//         is_rental: 0,
//         image: "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
//         city_id: 1,
//         city: {
//             id: 1,
//             name: "სოხუმი",
//             region_id: 1,
//             region: {
//                 id: 1,
//                 name: "აფხაზეთი"
//             }
//         }
//     },
//     {
//         id: 4,
//         address: "შარტავას 2ა",
//         zip_code: "0101",
//         price: 100000,
//         area: 100.5,
//         bedrooms: 3,
//         is_rental: 0,
//         image: "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
//         city_id: 1,
//         city: {
//             id: 1,
//             name: "სოხუმი",
//             region_id: 1,
//             region: {
//                 id: 1,
//                 name: "აფხაზეთი"
//             }
//         }
//     },
//     {
//         id: 5,
//         address: "შარტავას 2ა",
//         zip_code: "0101",
//         price: 100000,
//         area: 100.5,
//         bedrooms: 3,
//         is_rental: 0,
//         image: "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
//         city_id: 1,
//         city: {
//             id: 1,
//             name: "სოხუმი",
//             region_id: 1,
//             region: {
//                 id: 1,
//                 name: "აფხაზეთი"
//             }
//         }
//     },
//     {
//         id: 6,
//         address: "შარტავას 2ა",
//         zip_code: "0101",
//         price: 100000,
//         area: 100.5,
//         bedrooms: 3,
//         is_rental: 0,
//         image: "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
//         city_id: 1,
//         city: {
//             id: 1,
//             name: "სოხუმი",
//             region_id: 1,
//             region: {
//                 id: 1,
//                 name: "აფხაზეთი"
//             }
//         }
//     },
//     {
//         id: 7,
//         address: "შარტავას 2ა",
//         zip_code: "0101",
//         price: 100000,
//         area: 100.5,
//         bedrooms: 3,
//         is_rental: 0,
//         image: "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
//         city_id: 1,
//         city: {
//             id: 1,
//             name: "სოხუმი",
//             region_id: 1,
//             region: {
//                 id: 1,
//                 name: "აფხაზეთი"
//             }
//         }
//     },
//     {
//         id: 8,
//         address: "შარტავას 2ა",
//         zip_code: "0101",
//         price: 100000,
//         area: 100.5,
//         bedrooms: 3,
//         is_rental: 0,
//         image: "https://api.real-estate-manager.redberryinternship.ge/storage/agent_avatars/KXhmcUIaDo7TTkgfCBraeUhx3Nd6eTKrmsXOWkPh.png",
//         city_id: 1,
//         city: {
//             id: 1,
//             name: "სოხუმი",
//             region_id: 1,
//             region: {
//                 id: 1,
//                 name: "აფხაზეთი"
//             }
//         }
//     },


// ]

const Listings = () => {

    const [Listings, setListings] = useState<any[]>([]);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const data = (await fetchListings()) as any[];
                console.log("Fetched data:", data);
                setListings(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromApi();
    }, []);

    return (
        <div className='flex flex-wrap gap-10 w-full h-max items-center justify-between mt-[50px]'>
            {Listings.map((listing) => (
                <Card key={listing.id} listing={listing} />
            ))}
        </div>
    )
}

export default Listings