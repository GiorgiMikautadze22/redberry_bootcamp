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
    region_id: number;
}

export interface Agents {
    name: string;
    surname: string;
    phone: string;
    email: string;
    avatar: string | File | null;
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