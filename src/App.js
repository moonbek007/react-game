import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Column from "./Column";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillSetting,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import Settings from "./Settings";
import Statistics from "./Statistics";
import songs from "./songs";
let audio = new Audio(songs[Math.floor(Math.random() * songs.length)]);

if (localStorage.getItem("board") === null) {
  localStorage.setItem(
    "board",
    JSON.stringify({
      firstColumn: ["", "", ""],
      secondColumn: ["", "", ""],
      thirdColumn: ["", "", ""],
    })
  );
}
if (localStorage.getItem("bgColor") === null) {
  localStorage.setItem("bgColor", "#12F3E1");
}
if (localStorage.getItem("xoColors") === null) {
  localStorage.setItem(
    "xoColors",
    JSON.stringify({ xColor: "#fff", oColor: "#fff" })
  );
}
if (localStorage.getItem("scores") === null) {
  localStorage.setItem(
    "scores",
    JSON.stringify({
      playerX: 0,
      playerO: 0,
      draws: 0,
    })
  );
}
if (localStorage.getItem("showSettings") === null) {
  localStorage.setItem("showSettings", JSON.stringify(false));
}
if (localStorage.getItem("volume") === null) {
  localStorage.setItem("volume", 0.6);
}
if (localStorage.getItem("muted") === null) {
  localStorage.setItem("muted", JSON.stringify(false));
}
if (localStorage.getItem("stillPlaying") === null) {
  localStorage.setItem("stillPlaying", JSON.stringify(true));
}
if (localStorage.getItem("disabled") === null) {
  if (JSON.parse(localStorage.getItem("stillPlaying")) == true) {
    localStorage.setItem("disabled", JSON.stringify(false));
  } else {
    localStorage.setItem("disabled", JSON.stringify(false));
  }
}
if (JSON.parse(localStorage.getItem("stillPlaying") == true)) {
  localStorage.setItem("winner", "none");
}
if (localStorage.getItem("threeD") === null) {
  localStorage.setItem("threeD", JSON.stringify(false));
}
function App() {
  const [board, setBoard] = useState(JSON.parse(localStorage.getItem("board")));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [stillPlaying, setStillPlaying] = useState(
    JSON.parse(localStorage.getItem("stillPlaying"))
  );
  const [disabled, setDisabled] = useState(
    JSON.parse(localStorage.getItem("disabled"))
  );
  const [winner, setWinner] = useState(localStorage.getItem("winner"));
  const [showSettings, setShowSettings] = useState(
    JSON.parse(localStorage.getItem("showSettings"))
  );
  const [xoColors, setXOColors] = useState(
    JSON.parse(localStorage.getItem("xoColors"))
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [bgColor, setBgColor] = useState(localStorage.getItem("bgColor"));
  const [scores, setScores] = useState(
    JSON.parse(localStorage.getItem("scores"))
  );
  const [numOfMoves, setNumOfMoves] = useState(1);
  const [demo, setDemo] = useState(false);
  const [volume, setVolume] = useState(localStorage.getItem("volumen"));
  const [muted, setMuted] = useState(JSON.parse(localStorage.getItem("muted")));
  const [isThreeD, setIsThreeD] = useState(
    JSON.parse(localStorage.getItem("threeD"))
  );
  useEffect(() => {
    function playSound() {
      const tempVolume = localStorage.getItem("volume");
      if (tempVolume < 0) {
        localStorage.setItem("volume", 0.1);
        audio.volume = 0.1;
      } else if (tempVolume > 1) {
        localStorage.setItem("volume", 1);
        audio.volume = 1;
      }
      if (!muted) {
        audio.play();
      } else {
        audio.pause();
      }
    }
    playSound();
  }, [muted, volume]);

  const handleClick = (column, elementIndex) => {
    let temporaryBoard = { ...board };
    if (!temporaryBoard[column][elementIndex]) {
      temporaryBoard[column][elementIndex] = currentPlayer;
      localStorage.setItem("board", JSON.stringify(temporaryBoard));
      setBoard({ ...temporaryBoard });
      if (currentPlayer == "X") {
        const xSound = new Audio(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3"
        );
        xSound.play();
        setCurrentPlayer("O");
      } else {
        const oSound = new Audio(
          "http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3"
        );
        oSound.play();
        setCurrentPlayer("X");
      }
    }
  };

  const isGameOver = (board, column, elementIndex) => {
    let threeInARow = true;
    for (let index = 0; index < 3; index++) {
      if (board[column][index] != currentPlayer) {
        threeInARow = false;
        break;
      }
    }
    if (threeInARow) {
      localStorage.setItem("winner", currentPlayer);
      setWinner(currentPlayer);
      localStorage.setItem("stillPlaying", JSON.stringify(false));
      setStillPlaying(false);
      localStorage.setItem("disabled", JSON.stringify(true));
      setDisabled(true);
      if (currentPlayer === "X") {
        localStorage.setItem(
          "scores",
          JSON.stringify({ ...scores, playerX: scores.playerX + 1 })
        );
        setScores({
          ...scores,
          playerX: scores.playerX + 1,
        });
      } else if (currentPlayer === "O") {
        localStorage.setItem(
          "scores",
          JSON.stringify({ ...scores, playerO: scores.playerO + 1 })
        );
        setScores({
          ...scores,
          playerO: scores.playerO + 1,
        });
      }
      return true;
    }
    if (
      board.firstColumn[elementIndex] == currentPlayer &&
      board.secondColumn[elementIndex] == currentPlayer &&
      board.thirdColumn[elementIndex] == currentPlayer
    ) {
      threeInARow = true;
    }
    if (threeInARow) {
      localStorage.setItem("winner", currentPlayer);
      setWinner(currentPlayer);
      localStorage.setItem("stillPlaying", JSON.stringify(false));
      setStillPlaying(false);
      localStorage.setItem("disabled", JSON.stringify(true));
      setDisabled(true);
      if (currentPlayer === "X") {
        localStorage.setItem(
          "scores",
          JSON.stringify({ ...scores, playerX: scores.playerX + 1 })
        );
        setScores({
          ...scores,
          playerX: scores.playerX + 1,
        });
      } else if (currentPlayer === "O") {
        localStorage.setItem(
          "scores",
          JSON.stringify({ ...scores, playerO: scores.playerO + 1 })
        );
        setScores({
          ...scores,
          playerO: scores.playerO + 1,
        });
      }
      return true;
    } else {
      if (
        board.firstColumn[0] == currentPlayer &&
        board.secondColumn[1] == currentPlayer &&
        board.thirdColumn[2] == currentPlayer
      ) {
        threeInARow = true;
      } else if (
        board.firstColumn[2] == currentPlayer &&
        board.secondColumn[1] == currentPlayer &&
        board.thirdColumn[0] == currentPlayer
      ) {
        threeInARow = true;
      }
    }
    if (threeInARow) {
      localStorage.setItem("winner", currentPlayer);
      setWinner(currentPlayer);
      localStorage.setItem("stillPlaying", JSON.stringify(false));
      setStillPlaying(false);
      localStorage.setItem("disabled", JSON.stringify(true));
      setDisabled(true);
      if (currentPlayer === "X") {
        localStorage.setItem(
          "scores",
          JSON.stringify({ ...scores, playerX: scores.playerX + 1 })
        );
        setScores({
          ...scores,
          playerX: scores.playerX + 1,
        });
      } else if (currentPlayer === "O") {
        localStorage.setItem(
          "scores",
          JSON.stringify({ ...scores, playerO: scores.playerO + 1 })
        );
        setScores({
          ...scores,
          playerO: scores.playerO + 1,
        });
      }
      return true;
    }
    if (numOfMoves == 9) {
      const drawSound = new Audio(
        "http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg"
      );
      drawSound.play();
      localStorage.setItem("winner", "Tied");
      setWinner("Tied");
      setStillPlaying(false);
      localStorage.setItem("stillPlaying", JSON.stringify(false));
      setDisabled(true);
      localStorage.setItem("disabled", JSON.stringify(true));
      localStorage.setItem(
        "scores",
        JSON.stringify({ ...scores, draws: scores.draws + 1 })
      );
      setScores({
        ...scores,
        draws: scores.draws + 1,
      });
      return true;
    }
    return false;
  };

  const changeXOColors = (newXOColors) => {
    setXOColors({ ...newXOColors });
  };

  const changeBgColor = (newColor) => {
    setBgColor(() => {
      return newColor;
    });
  };

  const emptyScoreboard = () => {
    localStorage.setItem(
      "scores",
      JSON.stringify({ playerX: 0, playerO: 0, draws: 0 })
    );
    setScores({
      playerX: 0,
      playerO: 0,
      draws: 0,
    });
  };

  const incrementNumOfMoves = () => {
    setNumOfMoves(() => {
      return numOfMoves + 1;
    });
    console.log(numOfMoves);
  };

  const handleAutoPlayClick = (figure, column, elementIndex) => {
    let temporaryBoard = { ...board };
    if (!temporaryBoard[column][elementIndex]) {
      temporaryBoard[column][elementIndex] = figure;
      setBoard({ ...temporaryBoard });
    }
  };

  const autoPlay = (play) => {
    setBoard({
      firstColumn: ["", "", ""],
      secondColumn: ["", "", ""],
      thirdColumn: ["", "", ""],
    });
    setDemo(true);
    if (play) {
      let timeOut = setTimeout(() => {
        handleAutoPlayClick("X", "firstColumn", 0);
      }, 1500);
      setTimeout(() => {
        handleAutoPlayClick("O", "secondColumn", 1);
      }, 3000);
      setTimeout(() => {
        handleAutoPlayClick("X", "thirdColumn", 2);
      }, 4500);
      setTimeout(() => {
        handleAutoPlayClick("O", "thirdColumn", 0);
      }, 6000);
      setTimeout(() => {
        handleAutoPlayClick("X", "firstColumn", 2);
      }, 7500);
      setTimeout(() => {
        handleAutoPlayClick("O", "firstColumn", 1);
      }, 9000);
      setTimeout(() => {
        handleAutoPlayClick("X", "secondColumn", 2);
      }, 10500);
    }
  };

  const changeVolume = (action) => {
    switch (action) {
      case "increase":
        if (volume < 1) {
          localStorage.setItem("volume", volume + 0.1);
          setVolume(volume + 0.1);
        }
        break;
      case "decrease":
        if (volume > 0) {
          localStorage.setItem("volume", volume - 0.1);
          setVolume(volume - 0.1);
        }
        break;
      default:
        break;
    }
  };

  const changeMuted = () => {
    localStorage.setItem("muted", JSON.stringify(!muted));
    setMuted(!muted);
  };

  const changeMusic = () => {
    audio.pause();
    audio = new Audio(songs[Math.floor(Math.random() * 10)]);
    audio.play();
    localStorage.setItem("muted", JSON.stringify(false));
    setMuted(false);
  };
  const changeThreeD = () => {
    localStorage.setItem("threeD", JSON.stringify(!isThreeD));
    setIsThreeD(!isThreeD);
  };
  // const eventHandler = (event) => {
  //   switch (event.key) {
  //     case "m":
  //       changeMuted();
  //       break;
  //     case "c":
  //       changeMusic();
  //       break;
  //     case "d":
  //       changeThreeD();
  //       break;
  //     case "+":
  //       changeVolume("increase");
  //       break;
  //     case "-":
  //       changeVolume("decrease");
  //     case "n":
  //       document.getElementById("ng").click();
  //       break;
  //     case "e":
  //       emptyScoreboard();
  //       break;
  //     case "x":
  //       changeXOColors();
  //       break;
  //     case "b":
  //       document.getElementById("bg-btn").click();
  //     default:
  //       break;
  //   }
  // };
  // function addEventListenerRepeatedly() {
  //   window.addEventListener("keypress", eventHandler);
  //   return window.removeEventListener("keypress", eventHandler);
  // }
  // addEventListenerRepeatedly();
  return (
    <div className="wrapper" id="wrapper" style={{ backgroundColor: bgColor }}>
      <Settings
        showSettings={showSettings}
        changeXOColors={changeXOColors}
        isFullScreen={isFullScreen}
        changeBgColor={changeBgColor}
        emptyScoreboard={emptyScoreboard}
        autoPlay={autoPlay}
        demo={demo}
        changeVolume={changeVolume}
        changeMuted={changeMuted}
        changeMusic={changeMusic}
        changeThreeD={changeThreeD}
      />
      <Statistics scores={scores} isFullScreen={isFullScreen} />
      <div className="game">
        <header className="header">
          <h1>Tic Tac Toe</h1>
          <div className="vs">
            <div className="buttons">
              {
                <button
                  id="full-screen-btn"
                  onClick={() => {
                    if (isFullScreen) {
                      document.exitFullscreen();
                      setIsFullScreen(false);
                    } else {
                      document.getElementById("wrapper").requestFullscreen();
                      setIsFullScreen(true);
                    }
                  }}
                >
                  {isFullScreen ? (
                    <AiOutlineFullscreenExit />
                  ) : (
                    <AiOutlineFullscreen />
                  )}
                </button>
              }
              <button
                id="settings-btn"
                onClick={() => {
                  localStorage.setItem(
                    "showSettings",
                    JSON.stringify(!showSettings)
                  );
                  setShowSettings(() => {
                    return !showSettings;
                  });
                }}
                style={{ background: "inherit" }}
              >
                <AiFillSetting />
              </button>
            </div>
          </div>
          <div className="new-game-button">
            <button
              id="ng"
              onClick={() => {
                setBoard({
                  firstColumn: ["", "", ""],
                  secondColumn: ["", "", ""],
                  thirdColumn: ["", "", ""],
                });
                setStillPlaying(true);
                setDisabled(false);
                setWinner("");
                setNumOfMoves(1);
                setCurrentPlayer("X");
                if (demo) {
                  setDemo(false);
                }
              }}
            >
              New Game
            </button>
          </div>
        </header>
        <main className="main-display">
          <h3 style={{ opacity: !demo ? "1" : "0" }}>
            {stillPlaying
              ? `It's player (${currentPlayer}) turn`
              : winner === "Tied"
              ? "Tied !"
              : `Player ${winner} won!`}
          </h3>
          <div className={`game-display ${isThreeD ? "game-display-3d" : " "}`}>
            <Column
              values={board.firstColumn}
              column="firstColumn"
              handleClick={handleClick}
              board={board}
              isGameOver={isGameOver}
              disabled={disabled}
              xoColors={xoColors}
              incrementNumOfMoves={incrementNumOfMoves}
            />
            <Column
              values={board.secondColumn}
              column="secondColumn"
              handleClick={handleClick}
              board={board}
              isGameOver={isGameOver}
              disabled={disabled}
              xoColors={xoColors}
              incrementNumOfMoves={incrementNumOfMoves}
            />
            <Column
              values={board.thirdColumn}
              column="thirdColumn"
              handleClick={handleClick}
              board={board}
              isGameOver={isGameOver}
              disabled={disabled}
              xoColors={xoColors}
              incrementNumOfMoves={incrementNumOfMoves}
            />
          </div>
        </main>
        <footer className="footer">
          <a href="https://rs.school/js/" target="_blank">
            <img
              src="https://rs.school/images/rs_school_js.svg"
              alt="rs_school_logo"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/oybek-mamatov-96280a1a8/"
            target="_blank"
          >
            <AiFillLinkedin style={{ fontSize: "1.5rem", color: "white" }} />
          </a>
          <a href="https://t.me/moonbek007" target="_blank">
            <FaTelegram style={{ fontSize: "1.5rem", color: "white" }} />
          </a>
          <a href="https://github.com/moonbek007" target="_blank">
            <AiFillGithub style={{ fontSize: "1.5rem", color: "white" }} />
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
