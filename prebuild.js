// prebuild.js
const fs = require("fs");
const https = require("https");

const apiURL =
  "https://api.almadinah.io/api/Settings/GetAllLanguages?pagenum=1&pagesize=50";

https
  .get(apiURL, (resp) => {
    let data = "";

    // A chunk of data has been received.
    resp.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    resp.on("end", () => {
      const languages = JSON.parse(data);
      const locales = languages.map((lang) => lang.shortCut);

      // Update your configuration object for i18n
      const i18nConfig = {
        defaultLocale: "en", // or dynamically set this based on your conditions
        locales,
        localeDetection: true,
      };

      // Write this config to a separate JSON file or directly into next.config.js as needed
      fs.writeFileSync(
        "./i18nConfig.json",
        JSON.stringify(i18nConfig, null, 2),
        "utf-8"
      );

      console.log("Locale configuration has been updated.");
    });
  })
  .on("error", (err) => {
    console.log("Error fetching locales: " + err.message);
  });
