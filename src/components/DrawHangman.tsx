import "../Css/DrawHangman.css";

type DrawHangmanProps = {
  numberOfGuess: number;
};

const HEAD = <div className="hangman-part head" />;
const BODY = <div className="hangman-part body" />;
const RIGHT_ARM = <div className="hangman-part right-arm" />;
const LEFT_ARM = <div className="hangman-part left-arm" />;
const RIGHT_LEG = <div className="hangman-part right-leg" />;
const LEFT_LEG = <div className="hangman-part left-leg" />;

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

const DrawHangman = ({ numberOfGuess }: DrawHangmanProps) => {
  return (
    <div className="position-relative hangman-container">
      {BODY_PARTS.slice(0, numberOfGuess)}

      <div className="hangman-top-bar" />

      <div className="hangman-angled-rope" />

      <div className="hangman-horizontal-bar" />

      <div className="hangman-vertical-pole" />

      <div className="hangman-base" />
    </div>
  );
};

export default DrawHangman;
