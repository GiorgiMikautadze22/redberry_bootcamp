export interface FormData {
    price: number,
    zip_code: number | string,
    description: string,
    area: number,
    city_id: number,
    region_id: number,
    address: string,
    agent_id: number,
    bedrooms: number,
    is_rental: number,
    image: string | File | null,
}

export interface Regions {
    id: number;
    name: string;
}

export interface Cities {
    id: number;
    name: string;
    region: Regions;
    region_id: number;
}

export interface Agents {
    name: string;
    surname: string;
    phone: string;
    email: string;
    avatar: string | File | null;
}

export interface Agent {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}

export interface ContextType {
    activePopUp: boolean;
    setActivePopUp: React.Dispatch<React.SetStateAction<boolean>>;
    agentDelete: boolean;
    setAgentDelete: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: string;
    setIsOpen: React.Dispatch<React.SetStateAction<string>>;
    Listings: any[];
    setListings: React.Dispatch<React.SetStateAction<any[]>>;
    filteredListings: any[];
    setFilteredListings: React.Dispatch<React.SetStateAction<any[]>>;
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

export interface Listing {
    address: string,
    agent: {
        name: string,
        surname: string,
        phone: string,
        email: string,
        avatar: string,
    },
    agent_id: number,
    bedrooms: number,
    created_at: string,
    city_id: number,
    description: string,
    id: number,
    image: string,
    city: Cities,
    is_rental: number,
    price: number,
    zip_code: number,
    area: number,

}