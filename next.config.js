/** @type {import('next').NextConfig} */

const withPugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        disableStaticImages: true,
        domains: ['res.cloudinary.com']
    }
};

const plugins = [withImages];
module.exports = withPugins(plugins, nextConfig);
