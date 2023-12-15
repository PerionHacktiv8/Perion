/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      'static.vecteezy.com',
      'docs.material-tailwind.com',
      'cdns.iconmonstr.com',
      'ik.imagekit.io',
      'images.unsplash.com',
    ],
  },
}

module.exports = nextConfig;

