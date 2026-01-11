interface PhoneKeypadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const keys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["+", "0", "⌫"],
];

export function PhoneKeypad({ value, onChange, disabled }: PhoneKeypadProps) {
  const handleKeyPress = (key: string) => {
    if (disabled) return;

    if (key === "⌫") {
      onChange(value.slice(0, -1));
    } else {
      onChange(value + key);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {keys.flat().map((key) => (
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
                  bg-gray-700 text-white
                  hover:bg-gray-600
                  active:scale-95
                `
            }
            ${key === "⌫" ? "text-red-400" : ""}
          `}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
