import HandPiece from "./HandPiece";

export default function HandPiecesDisplay({ handPieces, selectedHandIndex, setSelectedHandIndex }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
      {/* 先手の持ち駒 */}
      <div style={{ display: "flex", gap: 5 }}>
        {handPieces.filter(p => p.side === "sente").map((p, i) => (
          <HandPiece
            key={p.id}
            piece={p}
            selected={i === selectedHandIndex}
            onClick={() => setSelectedHandIndex(i)}
          />
        ))}
      </div>

      {/* 後手の持ち駒 */}
      <div style={{ display: "flex", gap: 5 }}>
        {handPieces.filter(p => p.side === "gote").map((p, i) => (
          <HandPiece
            key={p.id}
            piece={p}
            selected={i === selectedHandIndex}
            onClick={() => setSelectedHandIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
