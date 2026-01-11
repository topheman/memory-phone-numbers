import type { Screen } from "../types/contact";

interface SplashScreenProps {
  onNavigate: (screen: Screen) => void;
  hasContacts: boolean;
}

export function SplashScreen({ onNavigate, hasContacts }: SplashScreenProps) {
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
    </div>
  );
}
