import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);

  // Fetch languages when the component mounts
  useEffect(() => {
    fetch(
      "https://api.almadinah.io/api/Settings/GetAllLanguages?pagenum=1&pagesize=50"
    )
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response structure matches your example
        setLanguages(
          data.map((lang) => ({
            id: lang.id,
            name: lang.name,
            shortCut: lang.shortCut,
          }))
        );
      });
  }, []);

  return (
    <LanguageContext.Provider value={{ languages, setLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguages = () => useContext(LanguageContext);
