import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import DrawHangman from "./components/DrawHangman";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/App.css";

function App() {
  const [guessLetters, setGuessLetters] = useState<string[]>([]);
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });

  const incorrectLetters = guessLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessLetters.includes(letter));

  const addGuessLetter = useCallback(
    (letter: string) => {
      if (guessLetters.includes(letter) || isLoser || isWinner) {
        return;
      } else {
        setGuessLetters((currentLetters) => [...currentLetters, letter]);
      }
    },
    [guessLetters, isLoser, isWinner]
  );

  const resetGame = () => {
    setGuessLetters([]);
    setWordToGuess(words[Math.floor(Math.random() * words.length)]);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-ö]$/)) return;
      e.preventDefault();
      addGuessLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessLetters, addGuessLetter]);

  return (
    <Container className="min-vh-100 d-flex flex-column justify-content-start align-items-center pt-5">
      <h1 className="text-center mb-5">Hänga Gubbe gjort med Bootstrap</h1>

      {/* Win/Loss Modal */}
      <Modal show={isWinner || isLoser} centered>
        <Modal.Header className={isWinner ? "bg-success" : "bg-danger"}>
          <Modal.Title className="text-white">
            {isWinner ? "Grattis, du vann!" : "Du förlorade."}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Button variant="light" onClick={resetGame}>
            Spela igen
          </Button>
        </Modal.Body>
      </Modal>

      {/* Main game layout */}
      <Row className="w-100 justify-content-center mt-5">
        <Col md={6} className="d-flex justify-content-center">
          <DrawHangman numberOfGuess={incorrectLetters.length} />
        </Col>

        <Col md={6} className="Hangman-Word">
          <HangmanWord
            result={isLoser}
            guessLetters={guessLetters}
            wordToGuess={wordToGuess}
          />

          <div className="Keyboard">
            <Keyboard
              disabled={isWinner || isLoser}
              activeLetter={guessLetters.filter((letter) =>
                wordToGuess.includes(letter)
              )}
              inactiveLetter={incorrectLetters}
              addGuessLetter={addGuessLetter}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
