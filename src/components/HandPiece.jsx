import React from "react";
import { IMAGES } from "../data/images";

const cellSize = 40;

export default function HandPiece({ piece, selected, onClick }) {
    const image = IMAGES.normal[piece.type];
    const isGote = piece.side === "gote";

    return (
        <div
            onClick={onClick}
            style={{
                width: cellSize,
                height: cellSize,
                border: selected ? "2px solid red" : "1px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                userSelect: "none",
                background: "#f0f0f0",
            }}
        >
            {image && (
                <img
                    src={image}
                    alt={piece.type}
                    style={{
                        width: cellSize - 4,
                        height: cellSize - 4,
                        transform: isGote ? "rotate(180deg)" : "none",
                    }}
                />
            )}
        </div>
    );
}
