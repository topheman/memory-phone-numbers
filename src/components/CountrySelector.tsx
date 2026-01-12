import { useMemo } from "react";

import type { CountryCode } from "../utils/phoneFormat";
import { getCountryList } from "../utils/phoneFormat";

interface CountrySelectorProps {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  const countries = useMemo(() => getCountryList(), []);

  const selectedCountry = useMemo(
    () => countries.find((c) => c.code === value),
    [countries, value],
  );

  return (
    <div className="relative w-full max-w-xs">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CountryCode)}
        className={`
          w-full cursor-pointer appearance-none rounded-xl bg-gray-700 px-4 py-3
          pr-10 text-white transition-colors
          hover:bg-gray-600
          focus:ring-2 focus:ring-blue-500 focus:outline-none
        `}
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            <span aria-hidden="true">
              {country.flag}
              {"\u2003"}
            </span>
            <span>{country.name}</span>
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div
        className={`
          pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3
          text-gray-400
        `}
      >
        <span className="text-sm">▼</span>
      </div>
      {/* Display selected flag prominently */}
      {selectedCountry && (
        <div
          aria-hidden="true"
          className={`
            pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2
            pl-4 text-xl
          `}
        >
          {selectedCountry.flag}
        </div>
      )}
    </div>
  );
}
