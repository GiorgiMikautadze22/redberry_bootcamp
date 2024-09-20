"use client";
import React, { createContext, useState, useEffect } from "react";

interface ContextType {
    activePopUp: boolean;
    setActivePopUp: React.Dispatch<React.SetStateAction<boolean>>;
    agentDelete: boolean;
    setAgentDelete: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: string;
    setIsOpen: React.Dispatch<React.SetStateAction<string>>;
    Listings: any[];
    setListings: React.Dispatch<React.SetStateAction<any[]>>
    filteredListings: any[];
    setFilteredListings: React.Dispatch<React.SetStateAction<any[]>>
    minPrice: string;
    setMinPrice: React.Dispatch<React.SetStateAction<string>>;
    maxPrice: string;
    setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
    selectedRegion: string[];
    setSelectedRegion: React.Dispatch<React.SetStateAction<string[]>>;
    minArea: string;
    setMinArea: React.Dispatch<React.SetStateAction<string>>;
    maxArea: string;
    setMaxArea: React.Dispatch<React.SetStateAction<string>>;
    selectedBedrooms: string;
    setSelectedBedrooms: React.Dispatch<React.SetStateAction<string>>;
}

export const globalContext = createContext<ContextType | null>(null);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [activePopUp, setActivePopUp] = useState(false);
    const [agentDelete, setAgentDelete] = useState(false);
    const [isOpen, setIsOpen] = useState('');
    const [Listings, setListings] = useState<any[]>([]);
    const [filteredListings, setFilteredListings] = useState<any[]>([]);

    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [selectedRegion, setSelectedRegion] = useState<string[]>([])
    const [minArea, setMinArea] = useState('')
    const [maxArea, setMaxArea] = useState('')
    const [selectedBedrooms, setSelectedBedrooms] = useState('')


    const handleFiltering = () => {
        let updatedListings = Listings;

        // Filter by region
        if (selectedRegion.length > 0) {
            updatedListings = updatedListings.filter((item) => selectedRegion.includes(item.city.region.name));
        }

        // Filter by price
        if (minPrice && maxPrice) {
            updatedListings = updatedListings.filter((item) => item.price > minPrice && item.price < maxPrice);
        }

        // Filter by area
        if (minArea && maxArea) {
            updatedListings = updatedListings.filter((item) => item.area > minArea && item.area < maxArea);
        }
        // Filter by bedrooms
        if (selectedBedrooms) {
            updatedListings = updatedListings.filter((item) => item.bedrooms === Number(selectedBedrooms));
            console.log("selectedBedrooms", selectedBedrooms)
            console.log("listings", Listings)
        }

        // Set the final filtered listings
        setFilteredListings(updatedListings);
    };


    useEffect(() => {
        handleFiltering()
    }, [selectedRegion, minPrice, maxPrice, Listings, minArea, maxArea, selectedBedrooms])



    return (
        <globalContext.Provider value={{
            activePopUp, minArea, maxArea, setMaxArea, setMinArea, setActivePopUp, agentDelete, setAgentDelete, isOpen, setIsOpen, Listings, setListings, filteredListings, setFilteredListings, minPrice, setMinPrice, maxPrice, setMaxPrice, selectedRegion, setSelectedRegion, selectedBedrooms, setSelectedBedrooms
        }}>
            {children}
        </globalContext.Provider>
    );
};
