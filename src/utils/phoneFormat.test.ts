import { describe, expect, it } from "vitest";

import {
  normalizePhoneNumberForComparison,
  formatPhoneNumber,
  type CountryCode,
} from "./phoneFormat";

describe("normalizePhoneNumberForComparison", () => {
  const country: CountryCode = "FR";

  describe("Local French number", () => {
    it("should normalize local French number", () => {
      const stored = "0102030405";
      const entered = "01 02 03 04 05";
      const normalizedStored = normalizePhoneNumberForComparison(
        stored,
        country,
      );
      const normalizedEntered = normalizePhoneNumberForComparison(
        entered,
        country,
      );

      expect(normalizedStored).toBe("0102030405");
      expect(normalizedEntered).toBe("0102030405");
      expect(normalizedStored).toBe(normalizedEntered);
    });

    it("should match local format with international format for French number", () => {
      const stored = "0102030405";
      const entered = "+33102030405";
      const normalizedStored = normalizePhoneNumberForComparison(
        stored,
        country,
      );
      const normalizedEntered = normalizePhoneNumberForComparison(
        entered,
        country,
      );

      expect(normalizedStored).toBe("0102030405");
      expect(normalizedEntered).toBe("0102030405");
      expect(normalizedStored).toBe(normalizedEntered);
    });

    it("should match international format with local format for French number", () => {
      const stored = "+33102030405";
      const entered = "0102030405";
      const normalizedStored = normalizePhoneNumberForComparison(
        stored,
        country,
      );
      const normalizedEntered = normalizePhoneNumberForComparison(
        entered,
        country,
      );

      expect(normalizedStored).toBe("0102030405");
      expect(normalizedEntered).toBe("0102030405");
      expect(normalizedStored).toBe(normalizedEntered);
    });
  });

  describe("International French number", () => {
    it("should normalize international French number", () => {
      const stored = "+33102030405";
      const entered = "+33102030405";
      const normalizedStored = normalizePhoneNumberForComparison(
        stored,
        country,
      );
      const normalizedEntered = normalizePhoneNumberForComparison(
        entered,
        country,
      );

      expect(normalizedStored).toBe("0102030405");
      expect(normalizedEntered).toBe("0102030405");
      expect(normalizedStored).toBe(normalizedEntered);
    });
  });

  describe("International non-French number (US)", () => {
    it("should normalize international US number", () => {
      const stored = "+15512345678";
      const entered = "+15512345678";
      const normalizedStored = normalizePhoneNumberForComparison(
        stored,
        country,
      );
      const normalizedEntered = normalizePhoneNumberForComparison(
        entered,
        country,
      );

      expect(normalizedStored).toBe("+15512345678");
      expect(normalizedEntered).toBe("+15512345678");
      expect(normalizedStored).toBe(normalizedEntered);
    });
  });
});

describe("formatPhoneNumber", () => {
  const country: CountryCode = "FR";

  it("should format local French number", () => {
    const number = "0102030405";
    const formatted = formatPhoneNumber(number, country);
    expect(formatted).toBe("01 02 03 04 05");
  });

  it("should format international French number", () => {
    const number = "+33102030405";
    const formatted = formatPhoneNumber(number, country);
    expect(formatted).toBe("01 02 03 04 05");
  });

  it("should format international US number", () => {
    const number = "+15512345678";
    const formatted = formatPhoneNumber(number, country);
    expect(formatted).toContain("+1");
  });
});
