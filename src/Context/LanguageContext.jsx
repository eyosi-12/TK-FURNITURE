import React, { createContext, useContext, useState, useEffect } from "react";
import {
  translations,
  productTranslations,
  projectTranslations,
} from "../translations/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem("tk_furniture_lang");
      return saved === "am" ? "am" : "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (lang) => {
    const validLang = lang === "am" ? "am" : "en";
    setLanguageState(validLang);
    try {
      localStorage.setItem("tk_furniture_lang", validLang);
    } catch (e) {
      console.warn("Could not save language to localStorage", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "am" : "en");
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const isAmharic = language === "am";

  // t("nav.home") or t("catalog.showingPieces", { count: 5 })
  const t = (path, params = {}) => {
    if (!path) return "";
    const keys = path.split(".");
    let current = translations[language] || translations.en;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = translations.en;
        for (const fKey of keys) {
          if (fallback && typeof fallback === "object" && fKey in fallback) {
            fallback = fallback[fKey];
          } else {
            return path;
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current === "string") {
      let result = current;
      if (params && typeof params === "object") {
        Object.entries(params).forEach(([k, v]) => {
          result = result.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        });
      }
      return result;
    }

    return typeof current === "string" ? current : path;
  };

  // Localize room category name
  const localizeCategory = (categoryName) => {
    if (!categoryName) return "";
    if (language === "en") return categoryName;

    const map = {
      All: "ሁሉም",
      "Living Room": "ሳሎን",
      Bedroom: "መኝታ ቤት",
      Kitchen: "ወጥ ቤት / መመገቢያ",
      Office: "ቢሮ",
      Apartment: "አፓርታማ / በረንዳ",
    };

    return map[categoryName] || categoryName;
  };

  // Localize subCategory / item type
  const localizeSubCategory = (subCatName) => {
    if (!subCatName) return "";
    if (language === "en") return subCatName;
    return translations.am?.subTypes?.[subCatName] || subCatName;
  };

  // Localize material
  const localizeMaterial = (materialName) => {
    if (!materialName) return "";
    if (language === "en") return materialName;
    return translations.am?.materials?.[materialName] || materialName;
  };

  // Localize product object
  const localizeProduct = (product) => {
    if (!product) return null;
    if (language === "en") return product;

    const overrides = productTranslations[product.id];
    if (!overrides) {
      return {
        ...product,
        category: localizeCategory(product.category),
        subCategory: localizeSubCategory(product.subCategory),
      };
    }

    return {
      ...product,
      name: overrides.name || product.name,
      category: overrides.category || localizeCategory(product.category),
      subCategory: overrides.subCategory || localizeSubCategory(product.subCategory),
      material: overrides.material || product.material,
      leadTime: overrides.leadTime || product.leadTime,
      description: overrides.description || product.description,
      colors: overrides.colors || product.colors,
    };
  };

  // Localize project object
  const localizeProject = (project) => {
    if (!project) return null;
    if (language === "en") return project;

    const overrides = projectTranslations[project.id];
    if (!overrides) {
      return {
        ...project,
        roomType: localizeCategory(project.roomType),
      };
    }

    return {
      ...project,
      title: overrides.title || project.title,
      roomType: overrides.roomType || localizeCategory(project.roomType),
      location: overrides.location || project.location,
      description: overrides.description || project.description,
      clientBrief: overrides.clientBrief || project.clientBrief,
    };
  };

  // Localize price string
  const formatPrice = (price) => {
    if (!price && price !== 0) {
      return t("catalog.priceOnRequest");
    }
    const num = Number(price).toLocaleString();
    return language === "am" ? `${num} ብር` : `ETB ${num}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isAmharic,
        t,
        localizeProduct,
        localizeProject,
        localizeCategory,
        localizeSubCategory,
        localizeMaterial,
        formatPrice,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
