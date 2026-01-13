import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

import githubIcon from "../assets/github.svg";
import { countryStorage } from "../services/countryStorage";
import type { Screen } from "../types/contact";
import type { CountryCode } from "../utils/phoneFormat";

import { CountrySelector } from "./CountrySelector";

interface SplashScreenProps {
  onNavigate: (screen: Screen) => void;
  hasContacts: boolean;
}

export function SplashScreen({ onNavigate, hasContacts }: SplashScreenProps) {
  const [country, setCountry] = useState<CountryCode>(() =>
    countryStorage.getCountry(),
  );
  const [targetUrl] = useState<string | null>(() => {
    const [url] = window.location.href.split("#");
    return url;
  });
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCountryChange = (code: CountryCode) => {
    setCountry(code);
    countryStorage.setCountry(code);
  };

  const githubRepoUrl = "https://github.com/topheman/memory-phone-numbers";

  return (
    <div
      className={`
        flex min-h-screen flex-col items-center justify-center gap-8 p-6
      `}
    >
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold">📱</h1>
        <h2 className="text-2xl font-semibold text-white">
          Memory Phone Numbers
        </h2>
        <p className="mt-2 text-gray-400">Train your memory!</p>
      </div>

      <CountrySelector value={country} onChange={handleCountryChange} />

      <div className="flex w-full max-w-xs flex-col gap-4">
        <button
          onClick={() => onNavigate("play")}
          disabled={!hasContacts}
          className={`
            rounded-xl px-6 py-4 text-lg font-semibold transition-all
            ${
              hasContacts
                ? `
                  bg-emerald-600 text-white
                  hover:bg-emerald-500
                  active:scale-95
                `
                : "cursor-not-allowed bg-gray-700 text-gray-500"
            }
          `}
        >
          🎮 Play
        </button>

        <button
          onClick={() => onNavigate("contacts")}
          className={`
            rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white
            transition-all
            hover:bg-blue-500
            active:scale-95
          `}
        >
          👥 Manage Contacts
        </button>
      </div>

      {!hasContacts && (
        <p className="text-center text-sm text-gray-500">
          Add some contacts to start playing!
        </p>
      )}

      <div className="mt-8 flex items-center gap-8">
        <a
          href={githubRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            h-8 w-8 transition-opacity
            hover:opacity-80
          `}
          title="GitHub Repository"
        >
          <img
            src={githubIcon}
            alt="GitHub"
            className="h-8 w-8 brightness-0 invert"
          />
        </a>

        {targetUrl && (
          <button
            onClick={() => setShowQrModal(true)}
            className={`
              min-h-[32px] min-w-[32px] cursor-pointer bg-white p-1
              transition-opacity
              hover:opacity-80
            `}
            title="Show QR Code"
            type="button"
          >
            <QRCodeSVG
              value={targetUrl}
              size={32}
              level="M"
              fgColor="#10b981"
              includeMargin={false}
            />
          </button>
        )}
      </div>

      {showQrModal && targetUrl && (
        <div
          className={`
            fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4
          `}
          onClick={() => setShowQrModal(false)}
        >
          <div
            className={`
              w-full max-w-sm rounded-2xl border border-gray-700 bg-gray-800 p-8
              shadow-lg
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-lg bg-white p-4">
                <QRCodeSVG
                  value={targetUrl}
                  size={256}
                  level="M"
                  fgColor="#10b981"
                  includeMargin={false}
                />
              </div>
              <p className="mb-4 text-center text-sm break-all text-gray-300">
                <a
                  href={targetUrl}
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {targetUrl}
                </a>
              </p>
              <button
                onClick={() => setShowQrModal(false)}
                className={`
                  rounded-lg bg-gray-700 px-6 py-2 transition-colors
                  hover:bg-gray-600
                `}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
