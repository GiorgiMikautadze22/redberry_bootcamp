import axios from "axios";
import requests from "./links";

export const fetchCities = async () => {
    try {
        const response = await fetch(requests.fetchCities);

        if (!response.ok) {
            throw new Error('Failed to fetch cities');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
export const fetchRegions = async () => {
    try {
        const response = await fetch(requests.fetchRegions);

        if (!response.ok) {
            throw new Error('Failed to fetch regions');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
export const fetchAgents = async () => {
    try {
        const token = '9d066257-f384-4952-b0a9-db8b4c7fb512';


        const response = await fetch(requests.fetchAgents, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        });

        if (!response.ok) {
            throw new Error('Failed to fetch Agents');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
export const fetchListings = async () => {
    try {
        const token = '9d066257-f384-4952-b0a9-db8b4c7fb512';


        const response = await fetch(requests.fetchListings, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        });

        if (!response.ok) {
            throw new Error('Failed to fetch Agents');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


