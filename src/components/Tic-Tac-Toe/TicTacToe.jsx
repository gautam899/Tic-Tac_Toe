// import React, { useRef, useState } from "react";
// import "./TicTacToe.css";

// // Also we need the image from the assets from the assets folder.
// import circle_icon from "../Assets/circle.png";
// import cross_icon from "../Assets/cross.png";

// let data = ["", "", "", "", "", "", "", "", ""]; //This will be our storage.

// const TicTacToe = () => {
//   let [count, setCount] = useState(0);
//   let [lock, setLock] = useState(false);
//   let titleRef = useRef(null);
//   const toggle = (e, num) => {
//     if (lock) {
//       //If we have a winner we will turn the lock to true and return 0
//       return 0;
//     }
//     // If our count is even then it is the x players turn.
//     if (count % 2 === 0) {
//       e.target.innerHTML = `<img scr='${cross_icon}'>`;
//       data[num] = "x";
//       setCount(++count);
//     } //If the count variable is odd then we will mark the data with character o.
//     else {
//       e.target.innerHTML = `<img scr='${circle_icon}'>`;
//       data[num] = "o";
//       setCount(++count);
//     }
//     checkWin();
//   };

//   //Lets not create an arrow function check win to know who is the winner.
//   const checkWin = () => {
//     if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
//       won(data[2]);
//     } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
//       won(data[5]);
//     } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
//       won(data[8]);
//     } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
//       won(data[6]);
//     } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
//       won(data[7]);
//     } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
//       won(data[8]);
//     } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
//       won(data[8]);
//     } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
//       won(data[6]);
//     }
//   };
//   // Also let's create a function which will be executed when any player wins.
//   const won = (winner) => {
//     setLock(true);
//     if (winner === "x") {
//       titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon}>`;
//     } else if (winner === "o") {
//       titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon}>`;
//     }
//   };
//   return (
//     <div className="container">
//       <div className="title" ref={titleRef}>
//         Tic_Tac_Toe in <span>React</span>
//       </div>
//       <div className="board">
//         <div className="row1">
//           <div
//             className="boxes"
//             onClick={(e) => {
//               toggle(e, 0);
//             }}
//           ></div>
//           <div
//             className="boxes"
//             onClick={(e) => {
//               toggle(e, 1);
//             }}
//           ></div>
//           <div
//             className="boxes"
//             onClick={(e) => {
//               toggle(e, 2);
//             }}
//           ></div>
//         </div>
//         <div className="row2">
//           <div
//             className="boxes"
//             onClick={(e) => {
//               toggle(e, 3);
//             }}
//           ></div>
//           <div
//             className="boxes"
//             onClick={(e) => {
//               toggle(e, 4);
//             }}
//           ></div>
//           <div
//             className="boxes"
//             onClick={(e) => {
//               toggle(e, 5);
//             }}
//           ></div>
//         </div>
//         <div className="row3">
//           <div
//             className="boxes"
//             onClick={(e) => {
//               toggle(e, 6);
//             }}
//           ></div>
//           <div
//             className="boxes"
//             onClick={(e) => {
//               toggle(e, 7);
//             }}
//           ></div>
//           <div
//             className="boxes"
//             onClick={(e) => {
//               toggle(e, 8);
//             }}
//           ></div>
//         </div>
//       </div>
//       <button className="reset">Reset</button>
//     </div>
//   );
// };

// export default TicTacToe;

import { useState } from "react";
import "./TicTacToe.css";
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    //If we already have a Winner or the box is already having a cross or a O then we return.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner === "Draw" ? "Draw" : "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //   Now we need to handle the reset button. Once we click the reset button we need to make sure that the board becomes empty and the status is
  //next player x.
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="container">
      <div className="title">
        Tic-Tac-Toe using <span>React</span>
      </div>
      <div className="status">
        <span>{status}</span>
      </div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      {/* Now we need a reset button to reset our board empty once we have winner. */}
      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

function calculateWinner(squares) {
    // For winner we have intotal 8 possiblities. ALl the rows and coloums and the two diagonals.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every((square) => square !== null)) {
    return "Draw";
  }
  return  null;
}
