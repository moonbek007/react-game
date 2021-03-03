import React from "react";
import { MdColorize, MdTablet } from "react-icons/md";
import { IoMdColorWand } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { GoMute, GoUnmute } from "react-icons/go";
import { GiPerspectiveDiceThree } from "react-icons/gi";
const generateRandomColor = () => {
  const hexValues = "0123456789ABCDEF";
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hexValues[Math.floor(Math.random() * 16)];
  }
  return hexColor;
};

function Settings({
  showSettings,
  changeXOColors,
  isFullScreen,
  changeBgColor,
  emptyScoreboard,
  autoPlay,
  changeVolume,
  changeMuted,
  changeMusic,
  changeThreeD,
}) {
  return (
    <aside
      className={`settings ${showSettings ? "show-settings" : " "}`}
      style={{ top: isFullScreen ? "70px" : "0px" }}
    >
      <h1 style={{ fontFamily: "cursive" }}>Game Settings</h1>
      <div className="do-something">
        <ul>
          <li>
            <h3>Empty The Scoreboard</h3>
            <button
              className="background-btn"
              onClick={() => {
                emptyScoreboard();
              }}
            >
              <FaTrash />
            </button>
          </li>
          <li>
            <h3>Change (X) (O) Colors</h3>
            <button
              id="bg-btn"
              className="background-btn"
              onClick={() => {
                let nextXOColors = {
                  xColor: generateRandomColor(),
                  oColor: generateRandomColor(),
                };
                localStorage.setItem("xoColors", JSON.stringify(nextXOColors));
                changeXOColors(nextXOColors);
              }}
            >
              <MdColorize style={{ color: "crimson" }} />
            </button>
          </li>
          <li>
            <h3>Change Background of the Page</h3>
            <button
              className="background-btn"
              onClick={() => {
                const tempColor = generateRandomColor();
                localStorage.setItem("bgColor", tempColor);
                changeBgColor(tempColor);
              }}
            >
              <IoMdColorWand style={{ color: "chocolate" }} />
            </button>
          </li>
          <li>
            <h3>Watch a Demo / Auto-Play</h3>
            <button
              className="background-btn"
              onClick={() => {
                autoPlay(true);
              }}
            >
              <MdTablet />
            </button>
          </li>
        </ul>
        <h1 style={{ fontFamily: "cursive", textAlign: "center" }}>Audio</h1>
        <div className="do-something">
          <ul>
            <li>
              <h3>Mute / Unmute Music</h3>
              <button
                className="background-btn"
                onClick={() => {
                  changeMuted();
                }}
              >
                {JSON.parse(localStorage.getItem("muted")) ? (
                  <GoMute />
                ) : (
                  <GoUnmute />
                )}
              </button>
            </li>
            <li>
              <h3>Volume</h3>
              <button
                className="background-btn"
                onClick={() => {
                  changeVolume("increase");
                }}
              >
                <AiOutlinePlus />
              </button>
              <button
                className="background-btn"
                onClick={() => {
                  changeVolume("decrease");
                }}
              >
                <AiOutlineMinus />
              </button>
            </li>
            <li>
              <h3>Change Music</h3>
              <button
                className="background-btn"
                onClick={() => {
                  changeMusic();
                }}
              >
                <SiApplemusic />
              </button>
            </li>
            <li>
              <h3>Play 3D</h3>
              <button
                className="background-btn"
                onClick={() => {
                  changeThreeD();
                }}
              >
                <GiPerspectiveDiceThree />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Settings;
