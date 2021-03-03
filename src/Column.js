import React from "react";
import "./Column.css";
function Column({
  values,
  column,
  handleClick,
  board,
  isGameOver,
  disabled,
  xoColors,
  incrementNumOfMoves,
}) {
  return (
    <div>
      {values.map((value, index) => {
        return (
          <button
            className="board-button"
            key={index}
            disabled={disabled}
            onClick={() => {
              handleClick(column, index);
              isGameOver(board, column, index);
              incrementNumOfMoves();
            }}
            style={{
              textShadow: `${
                JSON.parse(localStorage.getItem("threeD"))
                  ? "4px 4px 2px rgba(150, 150, 150, 1)"
                  : " "
              }`,
              color:
                value == "X"
                  ? xoColors.xColor
                  : value == "O"
                  ? xoColors.oColor
                  : " ",
            }}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}

export default Column;
