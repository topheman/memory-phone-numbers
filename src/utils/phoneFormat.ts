import {
  parsePhoneNumberFromString,
  getCountries,
  type CountryCode,
} from "libphonenumber-js";

export type { CountryCode };

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
}

/**
 * Convert ISO country code to flag emoji
 * e.g., 'FR' -> 🇫🇷
 */
function countryCodeToFlag(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Get list of all supported countries with names and flags
 */
export function getCountryList(): CountryInfo[] {
  const countries = getCountries();
  const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

  return countries
    .map((code) => ({
      code,
      name: displayNames.of(code) ?? code,
      flag: countryCodeToFlag(code),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Format a phone number for display based on country
 * - National format if the number belongs to the selected country
 * - International format if the number is from a different country
 * Returns the original string if parsing fails
 */
export function formatPhoneNumber(
  number: string,
  selectedCountry: CountryCode,
): string {
  if (!number) return "";

  try {
    const phoneNumber = parsePhoneNumberFromString(number, selectedCountry);
    if (phoneNumber) {
      // Use national format if same country, international otherwise
      if (phoneNumber.country === selectedCountry) {
        return phoneNumber.formatNational();
      }
      return phoneNumber.formatInternational();
    }
  } catch {
    // Fall through to return original
  }

  return number;
}
