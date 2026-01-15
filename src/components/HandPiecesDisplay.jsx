import HandPiece from "./HandPiece";

export default function HandPiecesDisplay({
    handPieces,
    selectedHandIndex,
    setSelectedHandIndex
}) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end", // 右寄せ
                gap: 30,
                marginTop: -50,
                width: "100%",
            }}
        >
            {/* 先手の持ち駒 */}
            <div style={{ display: "flex", gap: 5 }}>
                {handPieces.map((p, index) =>
                    p.side === "sente" ? (
                        <HandPiece
                            key={p.id}
                            piece={p}
                            selected={index === selectedHandIndex}
                            onClick={() => setSelectedHandIndex(index)}
                        />
                    ) : null
                )}
            </div>

            {/* 後手の持ち駒 */}
            <div style={{ display: "flex", gap: 5 }}>
                {handPieces.map((p, index) =>
                    p.side === "gote" ? (
                        <HandPiece
                            key={p.id}
                            piece={p}
                            selected={index === selectedHandIndex}
                            onClick={() => setSelectedHandIndex(index)}
                        />
                    ) : null
                )}
            </div>
        </div>
    );
}
