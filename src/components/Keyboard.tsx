import "../Css/Keyboard.css";
import { Button } from "react-bootstrap";

const KeyRows = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "å"],
  ["z", "x", "c", "v", "b", "n", "m", "ä", "ö"],
];

type KeyboardProps = {
  activeLetter: string[];
  inactiveLetter: string[];
  addGuessLetter: (letter: string) => void;
  disabled: boolean;
};

const Keyboard = ({
  activeLetter,
  inactiveLetter,
  addGuessLetter,
  disabled = false,
}: KeyboardProps) => {
  return (
    <div className="Keyboard">
      {KeyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="Keyboard-row">
          {row.map((key) => {
            const isActive = activeLetter.includes(key);
            const isInactive = inactiveLetter.includes(key);

            return (
              <Button
                variant="light"
                key={key}
                onClick={() => addGuessLetter(key)}
                className={`keyboard-btn 
                ${isActive ? "active" : ""} 
                ${isInactive ? "inactive" : ""}`}
                disabled={isInactive || isActive || disabled}
              >
                {key}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
