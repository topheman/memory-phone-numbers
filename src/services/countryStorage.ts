import { getCountries } from "libphonenumber-js";

import type { CountryCode } from "../utils/phoneFormat";

const STORAGE_KEY = "memory-phonenumbers-country";
const FALLBACK_COUNTRY: CountryCode = "US";

/**
 * Detect country from browser locale (e.g., "en-US" -> "US", "fr-FR" -> "FR")
 */
function detectCountryFromBrowser(): CountryCode {
  try {
    const locale = navigator.language || navigator.languages?.[0];
    if (locale) {
      // Extract country code from locale (e.g., "en-US" -> "US", "fr-FR" -> "FR")
      const parts = locale.split("-");
      if (parts.length >= 2) {
        const countryCode = parts[parts.length - 1].toUpperCase();
        const validCountries = getCountries();
        if (validCountries.includes(countryCode as CountryCode)) {
          return countryCode as CountryCode;
        }
      }
    }
  } catch {
    // Ignore detection errors
  }
  return FALLBACK_COUNTRY;
}

export const countryStorage = {
  getCountry(): CountryCode {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return stored as CountryCode;
      }
    } catch {
      console.error("Failed to read country from localStorage");
    }
    return detectCountryFromBrowser();
  },

  setCountry(code: CountryCode): void {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      console.error("Failed to save country to localStorage");
    }
  },
};
