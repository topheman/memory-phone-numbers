import { useEffect, useState } from "react";

interface PhoneKeypadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onEnter?: () => void;
}

const keys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["+", "0", "⌫"],
];

export function PhoneKeypad({
  value,
  onChange,
  disabled,
  onEnter,
}: PhoneKeypadProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleKeyPress = (key: string) => {
    if (disabled) return;

    if (key === "⌫") {
      onChange(value.slice(0, -1));
    } else {
      onChange(value + key);
    }
  };

  // Map keyboard key to keypad key
  const mapKeyboardToKeypad = (keyboardKey: string): string | null => {
    // Number keys
    if (keyboardKey >= "0" && keyboardKey <= "9") {
      return keyboardKey;
    }
    // Plus key
    if (keyboardKey === "+" || keyboardKey === "=") {
      return "+";
    }
    // Backspace/Delete
    if (keyboardKey === "Backspace" || keyboardKey === "Delete") {
      return "⌫";
    }
    return null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Handle Enter key (always, even when disabled)
      if (e.key === "Enter") {
        e.preventDefault();
        if (onEnter) {
          onEnter();
        }
        return;
      }

      // Only handle other keys when not disabled
      if (disabled) return;

      const keypadKey = mapKeyboardToKeypad(e.key);
      if (keypadKey) {
        e.preventDefault();
        setActiveKey(keypadKey);

        // Handle the input
        if (keypadKey === "⌫") {
          onChange(value.slice(0, -1));
        } else {
          onChange(value + keypadKey);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keypadKey = mapKeyboardToKeypad(e.key);
      if (keypadKey) {
        setActiveKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [disabled, value, onChange, onEnter]);

  return (
    <div className="grid grid-cols-3 gap-3">
      {keys.flat().map((key) => {
        const isActive = activeKey === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => handleKeyPress(key)}
            disabled={disabled}
            className={`
              flex h-14 items-center justify-center rounded-xl text-2xl
              font-medium transition-all
              ${
                disabled
                  ? "cursor-not-allowed bg-gray-800 text-gray-600"
                  : `
                    text-white
                    hover:bg-gray-600
                    active:scale-95
                    ${isActive ? "scale-95 bg-blue-500" : "bg-gray-700"}
                  `
              }
              ${key === "⌫" ? "text-red-400" : ""}
            `}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
