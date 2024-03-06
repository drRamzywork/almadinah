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
let locales = ["ar"]; // Default locales in case the file read fails

try {
  const localesFile = fs.readFileSync(localesFilePath, "utf-8");
  locales = JSON.parse(localesFile);
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
    localeDetection: false,
  },
};

module.exports = nextConfig;
