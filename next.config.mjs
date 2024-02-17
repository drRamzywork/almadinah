/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.dropbox.com" },
      { protocol: "https", hostname: "dl.dropboxusercontent.com" },
      { protocol: "https", hostname: "almadinah.io" },
    ],
  },

  i18n: {
    defaultLocale: "ar",
    locales: ["ar", "en"],
  },
};

export default nextConfig;
