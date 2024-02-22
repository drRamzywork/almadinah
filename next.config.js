// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       { protocol: "https", hostname: "www.dropbox.com" },
//       { protocol: "https", hostname: "dl.dropboxusercontent.com" },
//       { protocol: "https", hostname: "almadinah.io" },
//     ],
//   },

//   i18n: {
//     defaultLocale: "ar",
//     locales: ["en", "ar"],
//     localeDetection: true,
//   },
// };

// module.exports = nextConfig;

const fs = require("fs");
const path = require("path");

const localesFilePath = path.resolve("./public/locales/allLanguages.json");
let locales = ["en", "ar"]; // Default locales in case the file read fails

const defaultLocale = "ar";

try {
  const localesConfig = JSON.parse(fs.readFileSync(localesFilePath, "utf-8"));
  locales = Object.keys(localesConfig);
  // Ensure defaultLocale is included
  if (!locales.includes(defaultLocale)) {
    locales.push(defaultLocale);
  }
} catch (error) {
  console.error(
    "Failed to load locales from file. Using default locales.",
    error
  );
}

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
    locales,
    localeDetection: true,
  },
};

module.exports = nextConfig;
