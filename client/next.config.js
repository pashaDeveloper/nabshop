/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: 'http',
        hostname: 'localhost', 
        port: '', 
      
      },
    ],
  },
};

module.exports = nextConfig;
