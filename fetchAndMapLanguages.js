const fs = require("fs");
const path = require("path");

async function fetchAndMapLanguages() {
  try {
    const response = await fetch(
      "https://api.visitmadinahsa.com/api/Settings/GetAllLanguages?pagenum=1&pagesize=50"
    );
    const languages = await response.json();

    const localeToLangIdMap = languages.reduce((acc, lang) => {
      acc += `LANG_ID_${lang.shortCut.toUpperCase()}=${lang.id}\n`;
      return acc;
    }, "");

    // Write to .env file in the root directory
    fs.writeFileSync(path.join(process.cwd(), ".env.local"), localeToLangIdMap);
    console.log("Environment file with language mappings created.");

    // Call the function to save languages data to JSON file
    await saveLanguagesDataToJson(languages);
  } catch (error) {
    console.error("Failed to fetch languages and create .env file:", error);
  }
}

async function saveLanguagesDataToJson(languages) {
  try {
    const localesPath = path.join(process.cwd(), "public/locales");

    // Ensure the /public/locales directory exists
    if (!fs.existsSync(localesPath)) {
      fs.mkdirSync(localesPath, { recursive: true });
    }

    // Write the languages data to a JSON file
    fs.writeFileSync(
      path.join(localesPath, "allLanguagesData.json"),
      JSON.stringify(languages)
    );
    console.log("Languages data saved to JSON file.");
  } catch (error) {
    console.error("Failed to save languages data to JSON file:", error);
  }
}

fetchAndMapLanguages();
