"use client";
import React, { createContext, useState, useEffect } from "react";
import { ContextType, Listing } from "../interfaces/interface";

export const globalContext = createContext<ContextType | null>(null);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [activePopUp, setActivePopUp] = useState(false);
    const [agentDelete, setAgentDelete] = useState(false);
    const [isOpen, setIsOpen] = useState('');
    const [Listings, setListings] = useState<Listing[]>([]);
    const [filteredListings, setFilteredListings] = useState<Listing[]>([]);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
    const [minArea, setMinArea] = useState('');
    const [maxArea, setMaxArea] = useState('');
    const [selectedBedrooms, setSelectedBedrooms] = useState('');

    useEffect(() => {
        // Access localStorage only after component has mounted
        const storeRegions = localStorage.getItem('selectedRegionNames');
        const storeMinPrice = localStorage.getItem('minPrice');
        const storeMaxPrice = localStorage.getItem('maxPrice');
        const storeMinArea = localStorage.getItem('minArea');
        const storeMaxArea = localStorage.getItem('maxArea');
        const storeBedrooms = localStorage.getItem('selectedBedrooms');

        setMinPrice(storeMinPrice ? JSON.parse(storeMinPrice) : '');
        setMaxPrice(storeMaxPrice ? JSON.parse(storeMaxPrice) : '');
        setSelectedRegion(storeRegions ? JSON.parse(storeRegions) : []);
        setMinArea(storeMinArea ? JSON.parse(storeMinArea) : '');
        setMaxArea(storeMaxArea ? JSON.parse(storeMaxArea) : '');
        setSelectedBedrooms(storeBedrooms ? JSON.parse(storeBedrooms) : '');
    }, []);

    const handleFiltering = () => {
        let updatedListings = Listings;

        if (selectedRegion.length > 0) {
            updatedListings = updatedListings.filter((item) => selectedRegion.includes(item.city.region.name));
        }

        if (minPrice && maxPrice) {
            const minPriceNum = Number(minPrice);
            const maxPriceNum = Number(maxPrice);
            updatedListings = updatedListings.filter((item) => item.price >= minPriceNum && item.price <= maxPriceNum);
        }

        if (minArea && maxArea) {
            const minAreaNum = Number(minArea);
            const maxAreaNum = Number(maxArea);
            updatedListings = updatedListings.filter((item) => item.area >= minAreaNum && item.area <= maxAreaNum);
        }

        if (selectedBedrooms) {
            const bedroomsNum = Number(selectedBedrooms);
            updatedListings = updatedListings.filter((item) => item.bedrooms === bedroomsNum);
        }

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