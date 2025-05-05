import "../Css/HangmanWord.css";

type HangmanWordProps = {
  guessLetters: string[];
  wordToGuess: string;
  result?: boolean;
};

const HangmanWord = ({
  guessLetters,
  wordToGuess,
  result = false,
}: HangmanWordProps) => {
  return (
    <div className="Wrapper">
      {wordToGuess.split("").map((letter, index) => (
        <span className="hangman-letter" key={index}>
          <span
            style={{
              visibility:
                guessLetters.includes(letter) || result ? "visible" : "hidden",
              color:
                !guessLetters.includes(letter) && result
                  ? "#BE123C"
                  : "#1C1917",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
