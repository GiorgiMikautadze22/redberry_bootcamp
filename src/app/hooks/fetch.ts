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


