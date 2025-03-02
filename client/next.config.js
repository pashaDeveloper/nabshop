/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'lh3.googleusercontent.com'], // اضافه کردن دامنه مورد نظر
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "s3-console.noghlenab.com",
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
