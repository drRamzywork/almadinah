// scripts/fetchLocales.js
const fs = require("fs");
const path = require("path");
const https = require("https");

const apiURL =
  "https://api.visitmadinahsa.com/api/Settings/GetAllLanguages?pagenum=1&pagesize=50";
const outputPath = path.join(process.cwd(), "public/locales/allLanguages.json");

https
  .get(apiURL, (resp) => {
    let data = "";

    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      const languages = JSON.parse(data);
      const locales = languages.map((lang) => lang.shortCut);

      fs.writeFileSync(outputPath, JSON.stringify(locales), "utf-8");
      console.log("Locales have been updated.");
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
