/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      'static.vecteezy.com',
      'docs.material-tailwind.com',
      'cdns.iconmonstr.com',
      'ik.imagekit.io',
    ],
  },
}
