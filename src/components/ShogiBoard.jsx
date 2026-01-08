import React, { useState } from "react";
import { initialPieces } from "../data/initialPieces";
import Piece from "./Piece";
import HandPiecesDisplay from "./HandPiecesDisplay";
import { canMoveTo } from "../logic/moveLogic";
import { handlePieceClick } from "../logic/handlePieceClick";

const boardSize = 9;
const cellSize = 60;

export default function ShogiBoard() {
  const [pieces, setPieces] = useState(initialPieces);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [turn, setTurn] = useState("sente");
  const [winner, setWinner] = useState(null);
  const [handPieces, setHandPieces] = useState([]);
  const [selectedHandIndex, setSelectedHandIndex] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* ===== 盤面 ===== */}
      <svg
        width={cellSize * boardSize}
        height={cellSize * boardSize}
        style={{ background: "#f7e29b", marginBottom: 20 }}
      >
        {/* 盤のマス */}
        {Array.from({ length: boardSize }, (_, y) =>
          Array.from({ length: boardSize }, (_, x) => (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill={canMoveTo(x, y, pieces, selectedIndex) ? "rgba(0,255,0,0.3)" : "transparent"}
              stroke="#000"
              onClick={() =>
                handlePieceClick({
                  x,
                  y,
                  pieces,
                  setPieces,
                  selectedIndex,
                  setSelectedIndex,
                  handPieces,
                  setHandPieces,
                  selectedHandIndex,
                  setSelectedHandIndex,
                  turn,
                  setTurn,
                  winner,
                  setWinner,
                })
              }
            />
          ))
        )}

        {/* 駒の描画 */}
        {pieces.map((p, i) => (
          <Piece
            key={p.id}
            x={p.x}
            y={p.y}
            type={p.type}
            side={p.side}
            promoted={p.promoted}
            selected={i === selectedIndex}
          />
        ))}

        {/* 勝利表示 */}
        {winner && (
          <text
            x={cellSize * 2}
            y={cellSize * 5}
            fontSize="40"
            fill="red"
            fontWeight="bold"
          >
            {winner === "sente" ? "先手の勝ち！" : "後手の勝ち！"}
          </text>
        )}
      </svg>

      {/* ===== 手駒表示 ===== */}
      <HandPiecesDisplay
        handPieces={handPieces}
        selectedHandIndex={selectedHandIndex}
        setSelectedHandIndex={setSelectedHandIndex}
      />
    </div>
  );
}
