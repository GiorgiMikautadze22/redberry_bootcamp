"use client";
import React, { createContext, useState, useEffect } from "react";
import { ContextType } from "../interfaces/interface";


export const globalContext = createContext<ContextType | null>(null);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [activePopUp, setActivePopUp] = useState(false);
    const [agentDelete, setAgentDelete] = useState(false);
    const [isOpen, setIsOpen] = useState('');
    const [Listings, setListings] = useState<any[]>([]);
    const [filteredListings, setFilteredListings] = useState<any[]>([]);



    const storeRegions = localStorage.getItem('selectedRegionNames');
    const storeMinPrice = localStorage.getItem('minPrice');
    const storeMaxPrice = localStorage.getItem('maxPrice');
    const storeMinArea = localStorage.getItem('minArea');
    const storeMaxArea = localStorage.getItem('maxArea');
    const storeBedrooms = localStorage.getItem('selectedBedrooms');

    const [minPrice, setMinPrice] = useState(storeMinPrice ? JSON.parse(storeMinPrice) : '');
    const [maxPrice, setMaxPrice] = useState(storeMaxPrice ? JSON.parse(storeMaxPrice) : '');
    const [selectedRegion, setSelectedRegion] = useState<string[]>(storeRegions ? JSON.parse(storeRegions) : []);
    const [minArea, setMinArea] = useState(storeMinArea ? JSON.parse(storeMinArea) : '');
    const [maxArea, setMaxArea] = useState(storeMaxArea ? JSON.parse(storeMaxArea) : '');
    const [selectedBedrooms, setSelectedBedrooms] = useState(storeBedrooms ? JSON.parse(storeBedrooms) : '');

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

        }

        // Set the final filtered listings
        setFilteredListings(updatedListings);


    };

    useEffect(() => {
        handleFiltering();
    }, [selectedRegion, minPrice, maxPrice, Listings, minArea, maxArea, selectedBedrooms]);



    return (
        <globalContext.Provider value={{
            activePopUp, minArea, maxArea, setMaxArea, setMinArea, setActivePopUp, agentDelete, setAgentDelete, isOpen, setIsOpen, Listings, setListings, filteredListings, setFilteredListings, minPrice, setMinPrice, maxPrice, setMaxPrice, selectedRegion, setSelectedRegion, selectedBedrooms, setSelectedBedrooms
        }}>
            {children}
        </globalContext.Provider>
    );
};
