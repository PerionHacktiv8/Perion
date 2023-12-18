/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'static.vecteezy.com',
      'docs.material-tailwind.com',
      'cdns.iconmonstr.com',
      'ik.imagekit.io',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'bg3.wiki',
      'assets.stickpng.com',
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['pdfreader'],
  },
}

module.exports = nextConfig
