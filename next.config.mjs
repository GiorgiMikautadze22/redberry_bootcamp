/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.real-estate-manager.redberryinternship.ge',
                pathname: '/storage/images/**', // Adjust this based on the actual image path pattern
            },
            {
                protocol: 'https',
                hostname: 'api.real-estate-manager.redberryinternship.ge',
                pathname: '/storage/agent_avatars/**', // Match the specific path for agent avatars
            },
        ],
    },
};

export default nextConfig;
