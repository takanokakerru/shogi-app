// 打てるかチェック
export function canDrop(piece, x, y, pieces, handPieces) {
    // 1. すでに駒があるマスには置けない
    if (pieces.some(p => p.x === x && p.y === y)) return false;
    // 2. 歩の二歩チェック
    if (piece.type === "fu") {
        if (pieces.some(p => p.side === piece.side && p.type === "fu" && p.x === x))
            return false;
    }
    // 3. 歩・香・桂は最後列に打てない
    if (piece.side === "sente") {
        if ((piece.type === "fu" || piece.type === "kyo") && y === 0) return false;
        if (piece.type === "kei" && y <= 1) return false;
    } else {
        if ((piece.type === "fu" || piece.type === "kyo") && y === 8) return false;
        if (piece.type === "kei" && y >= 7) return false;
    }
    return true;
}

// 駒を打つ処理
export function dropPiece(piece, x, y, pieces, handPieces, setPieces, setHandPieces, setTurn) {
    if (!canDrop(piece, x, y, pieces, handPieces)) return false;
    // 盤面に追加
    setPieces([...pieces, { ...piece, x, y, promoted: false }]);
    // 手駒から削除
    setHandPieces(handPieces.filter(p => p.id !== piece.id));
    // ターン交代
    setTurn(piece.side === "sente" ? "gote" : "sente");
    return true;
}
