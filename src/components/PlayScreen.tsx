import { useCallback, useMemo, useState } from "react";

import { useContacts } from "../hooks/useContacts";
import type { Screen } from "../types/contact";

import { PhoneKeypad } from "./PhoneKeypad";

interface PlayScreenProps {
  onNavigate: (screen: Screen) => void;
}

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

type GameState = "playing" | "correct" | "incorrect";

// Track initialization outside component to persist across renders
let lastContactsLength = 0;

export function PlayScreen({ onNavigate }: PlayScreenProps) {
  const { contacts } = useContacts();

  // Use a version counter to trigger reshuffles
  const [gameVersion, setGameVersion] = useState(0);

  // Compute shuffled contacts based on version and contacts
  const shuffledContacts = useMemo(() => {
    if (contacts.length === 0) return [];
    // Re-shuffle when version changes or contacts change
    return shuffle(contacts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameVersion, contacts.length]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [gameState, setGameState] = useState<GameState>("playing");
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Reset game state when contacts length changes (new contacts added/removed)
  if (contacts.length !== lastContactsLength) {
    lastContactsLength = contacts.length;
    if (contacts.length > 0 && currentIndex >= contacts.length) {
      setCurrentIndex(0);
      setUserInput("");
      setGameState("playing");
    }
  }

  const currentContact = useMemo(
    () => shuffledContacts[currentIndex],
    [shuffledContacts, currentIndex],
  );

  const initGame = useCallback(() => {
    setGameVersion((v) => v + 1);
    setCurrentIndex(0);
    setUserInput("");
    setGameState("playing");
    setScore({ correct: 0, total: 0 });
  }, []);

  const handleCheck = () => {
    if (!currentContact || gameState !== "playing") return;

    // Normalize for comparison (remove spaces, dashes, parentheses)
    const normalize = (s: string) => s.replace(/[\s\-()]/g, "");
    const isCorrect = normalize(userInput) === normalize(currentContact.number);

    setGameState(isCorrect ? "correct" : "incorrect");
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    if (currentIndex < shuffledContacts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserInput("");
      setGameState("playing");
    } else {
      // Game finished - reshuffle
      initGame();
    }
  };

  const handleShuffle = () => {
    initGame();
  };

  const isGameFinished =
    currentIndex === shuffledContacts.length - 1 && gameState !== "playing";
  const progress = shuffledContacts.length
    ? `${currentIndex + 1}/${shuffledContacts.length}`
    : "0/0";

  if (contacts.length === 0) {
    return (
      <div
        className={`
          flex min-h-screen flex-col items-center justify-center gap-4 p-6
        `}
      >
        <p className="text-xl text-gray-400">No contacts to practice!</p>
        <button
          onClick={() => onNavigate("contacts")}
          className={`
            rounded-xl bg-blue-600 px-6 py-3 font-medium text-white
            hover:bg-blue-500
            active:scale-95
          `}
        >
          Add Contacts
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      {/* Header */}
      <header
        className={`
          sticky top-0 z-10 flex items-center gap-4 bg-gray-900/95 p-4
          backdrop-blur
        `}
      >
        <button
          onClick={() => onNavigate("splash")}
          className={`
            rounded-lg bg-gray-800 p-2 text-white transition-colors
            hover:bg-gray-700
          `}
          aria-label="Back to home"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold text-white">Play</h1>
        <span className="ml-auto text-sm text-gray-500">{progress}</span>
      </header>

      {/* Score */}
      <div className="flex justify-center gap-6 py-2 text-sm">
        <span className="text-emerald-400">✓ {score.correct}</span>
        <span className="text-red-400">✗ {score.total - score.correct}</span>
      </div>

      {/* Game Area */}
      <div
        className={`flex flex-1 flex-col items-center justify-center gap-6 p-6`}
      >
        {currentContact && (
          <>
            {/* Contact Name */}
            <div className="text-center">
              <p className="text-sm text-gray-500">What is the number for</p>
              <p className="text-3xl font-bold text-white">
                {currentContact.name}
              </p>
            </div>

            {/* Input Display */}
            <div
              className={`
                w-full max-w-xs rounded-xl border-2 bg-gray-800 p-4 text-center
                font-mono text-2xl tracking-wider
                ${
                  gameState === "correct"
                    ? "border-emerald-500 text-emerald-400"
                    : gameState === "incorrect"
                      ? "border-red-500 text-red-400"
                      : "border-gray-700 text-white"
                }
              `}
            >
              {userInput || (
                <span className="text-gray-600">Enter number...</span>
              )}
            </div>

            {/* Answer Reveal */}
            {gameState === "incorrect" && (
              <div className="text-center">
                <p className="text-sm text-gray-500">Correct answer:</p>
                <p className="font-mono text-lg text-emerald-400">
                  {currentContact.number}
                </p>
              </div>
            )}

            {/* Keypad */}
            <div className="w-full max-w-xs">
              <PhoneKeypad
                value={userInput}
                onChange={setUserInput}
                disabled={gameState !== "playing"}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex w-full max-w-xs gap-3">
              {gameState === "playing" ? (
                <>
                  <button
                    onClick={handleShuffle}
                    className={`
                      flex-1 rounded-xl bg-gray-700 px-4 py-3 font-medium
                      text-white transition-colors
                      hover:bg-gray-600
                      active:scale-95
                    `}
                  >
                    🔀 Shuffle
                  </button>
                  <button
                    onClick={handleCheck}
                    disabled={!userInput}
                    className={`
                      flex-1 rounded-xl px-4 py-3 font-medium transition-colors
                      active:scale-95
                      ${
                        userInput
                          ? `
                            bg-emerald-600 text-white
                            hover:bg-emerald-500
                          `
                          : "cursor-not-allowed bg-gray-700 text-gray-500"
                      }
                    `}
                  >
                    ✓ Check
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className={`
                    w-full rounded-xl bg-blue-600 px-4 py-3 font-medium
                    text-white transition-colors
                    hover:bg-blue-500
                    active:scale-95
                  `}
                >
                  {isGameFinished ? "🔄 Start Over" : "→ Next"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
