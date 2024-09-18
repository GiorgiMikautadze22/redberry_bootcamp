export interface FormData {
    price: number,
    zip_code: string,
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