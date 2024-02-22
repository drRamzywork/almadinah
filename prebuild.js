require("dotenv").config(); // Load environment variables
const fs = require("fs");
const https = require("https");

const apiURL =
  "https://api.almadinah.io/api/Settings/GetAllLanguages?pagenum=1&pagesize=50";

https
  .get(apiURL, (resp) => {
    let data = "";

    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      const languages = JSON.parse(data);
      // Generate an array of shortcuts only
      const locales = languages.map((lang) => lang.shortCut);

      const languagesDetails = languages.map((lang) => lang);

      // Write this array to the JSON file
      fs.writeFileSync(
        "./public/locales/allLanguages.json",
        JSON.stringify(locales, null, 2),
        "utf-8"
      );
      fs.writeFileSync(
        "./public/locales/languagesDetails.json",
        JSON.stringify(languagesDetails, null, 2),
        "utf-8"
      );

      console.log("Locale configuration has been updated.");
    });
  })
  .on("error", (err) => {
    console.log("Error fetching locales: " + err.message);
  });
