import { useState } from "react";

import type { Contact } from "../types/contact";

interface ContactFormProps {
  contact?: Contact | null;
  onSave: (data: { name: string; number: string }) => void;
  onCancel: () => void;
}

export function ContactForm({ contact, onSave, onCancel }: ContactFormProps) {
  // Form is remounted when contact changes, so initial values are sufficient
  const [name, setName] = useState(contact?.name ?? "");
  const [number, setNumber] = useState(contact?.number ?? "");

  const sanitizePhoneNumber = (value: string): string => {
    // Keep only + at the start and digits
    const cleaned = value.replace(/[^\d+]/g, "");
    // Ensure + is only at the beginning
    if (cleaned.startsWith("+")) {
      return "+" + cleaned.slice(1).replace(/[^\d]/g, "");
    }
    return cleaned.replace(/[^\d]/g, "");
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizePhoneNumber(e.target.value);
    setNumber(sanitized);
  };

  const handleNumberPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const sanitized = sanitizePhoneNumber(pastedText);
    setNumber(sanitized);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && number.trim()) {
      onSave({ name: name.trim(), number: number.trim() });
    }
  };

  const isValid = name.trim().length > 0 && number.trim().length > 0;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4
      `}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-gray-800 p-6"
      >
        <h2 className="mb-6 text-xl font-semibold text-white">
          {contact ? "Edit Contact" : "Add Contact"}
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm text-gray-400">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            autoFocus
            className={`
              w-full rounded-xl bg-gray-700 px-4 py-3 text-white
              placeholder:text-gray-500
              focus:ring-2 focus:ring-blue-500 focus:outline-none
            `}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="number" className="mb-2 block text-sm text-gray-400">
            Phone Number
          </label>
          <input
            id="number"
            type="tel"
            value={number}
            onChange={handleNumberChange}
            onPaste={handleNumberPaste}
            placeholder="+1 234 567 8900"
            className={`
              w-full rounded-xl bg-gray-700 px-4 py-3 text-white
              placeholder:text-gray-500
              focus:ring-2 focus:ring-blue-500 focus:outline-none
            `}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={`
              flex-1 rounded-xl bg-gray-700 px-4 py-3 font-medium text-white
              transition-colors
              hover:bg-gray-600
              active:scale-95
            `}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={`
              flex-1 rounded-xl px-4 py-3 font-medium transition-colors
              active:scale-95
              ${
                isValid
                  ? `
                    bg-blue-600 text-white
                    hover:bg-blue-500
                  `
                  : "cursor-not-allowed bg-gray-700 text-gray-500"
              }
            `}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
