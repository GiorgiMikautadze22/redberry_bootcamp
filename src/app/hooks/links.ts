const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const requests = {
    fetchListings: `${baseUrl}real-estates`,
    fetchCities: `${baseUrl}cities`,
    fetchRegions: `${baseUrl}regions`,
    fetchAgents: `${baseUrl}agents`,

};

export default requests;
