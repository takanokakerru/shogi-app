import { canMove } from './moveLogic';
import { dropPiece } from './dropLogic';
import { shouldPromote, mustPromote } from './promoteLogic';
import { playMoveSound } from './playMoveSound';
import { cpuMove } from './cpu';

export function handlePieceClick({
    x, y,
    pieces, setPieces,
    selectedIndex, setSelectedIndex,
    handPieces, setHandPieces,
    selectedHandIndex, setSelectedHandIndex,
    turn, setTurn,
    winner, setWinner,
}) {
    if (winner) return;

    // --- 手駒を打つ場合 ---
    if (selectedHandIndex !== null) {
        const piece = handPieces[selectedHandIndex];
        const targetIndex = pieces.findIndex(p => p.x === x && p.y === y);

        //  すでに駒があるマス → 打たない・選択解除
        if (targetIndex !== -1) {
            setSelectedHandIndex(null);
            return;
        }

        //  空マスだけ打てる
        const success = dropPiece(
            piece, x, y, pieces, handPieces,
            setPieces, setHandPieces, setTurn
        );

        if (success) {
            // ✅ CPUターンを開始
            const nextPieces = [...pieces, { ...piece, x, y, promoted: false }];
            const nextHand = handPieces.filter(p => p.id !== piece.id);

            setTimeout(() => {
                cpuMove(nextPieces, setPieces, setTurn, nextHand, setHandPieces);
            }, 300);
        } else {
            //  打てなかったら選択解除（固まり防止）
            setSelectedHandIndex(null);
        }
        return;

    }

    // --- 駒移動の場合 ---
    if (turn !== "sente") return;

    const targetIndex = pieces.findIndex(p => p.x === x && p.y === y);

    if (selectedIndex !== null && pieces[selectedIndex].x === x && pieces[selectedIndex].y === y) {
        setSelectedIndex(null);
        return;
    }

    if (selectedIndex === null) {
        if (targetIndex !== -1 && pieces[targetIndex].side === "sente") {
            const piece = pieces[targetIndex];
            const canMoveAnywhere = Array.from({ length: 9 }, (_, y2) =>
                Array.from({ length: 9 }, (_, x2) => canMove(piece, x2, y2, pieces))
            ).flat().some(Boolean);
            if (canMoveAnywhere) setSelectedIndex(targetIndex);
            else console.log("この駒は動かせません！");
        }
        return;
    }
    
    if (
        selectedIndex !== null &&
        targetIndex !== -1 &&
        pieces[targetIndex].side === "sente" &&
        targetIndex !== selectedIndex
    ) {
        setSelectedIndex(targetIndex);
        return;
    }

    // 選択中の駒で移動
    const piece = pieces[selectedIndex];
    if (!canMove(piece, x, y, pieces)) return;

    let next = pieces.filter((_, i) => i !== selectedIndex && i !== targetIndex);

    if (targetIndex !== -1 && pieces[targetIndex].side !== piece.side) {
        const captured = pieces[targetIndex];
        setHandPieces([...handPieces, { ...captured, side: piece.side, promoted: false, id: Date.now() }]);
    }

    let promoted = piece.promoted;
    if (shouldPromote(piece, y)) {
        promoted = mustPromote(piece, y) || window.confirm("成りますか？");
    }
    next.push({ ...piece, x, y, promoted });

    const goteKingAlive = next.some(p => p.type === "ou" && p.side === "gote");
    if (!goteKingAlive) {
        setPieces(next);
        setWinner("sente");
        return;
    }

    playMoveSound();

    setPieces(next);
    setSelectedIndex(null);
    setTurn("gote");

    // CPUターン
    setTimeout(() => cpuMove(next, setPieces, setTurn, handPieces, setHandPieces), 300);
}
