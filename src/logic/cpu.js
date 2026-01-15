import { canMove } from "./moveLogic";
import { shouldPromote, mustPromote } from "./promoteLogic";
import { playMoveSound } from "./playMoveSound";

export function cpuMove(
    ps,
    setPieces,
    setTurn,
    handPieces,
    setHandPieces
) {
    const moves = [];

    ps.forEach(p => {
        if (p.side !== "gote") return;

        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (!canMove(p, x, y, ps)) continue;

                const target = ps.find(q => q.x === x && q.y === y);

                moves.push({
                    p,
                    x,
                    y,
                    capture: target && target.side === "sente"
                });
            }
        }
    });

    if (!moves.length) return;

    // ⭐ 取れる手を優先
    const captureMoves = moves.filter(m => m.capture);
    const candidates = captureMoves.length ? captureMoves : moves;
    const m = candidates[Math.floor(Math.random() * candidates.length)];

    // ===== 取った駒を取得 =====
    const captured = ps.find(
        q => q.x === m.x && q.y === m.y && q.side === "sente"
    );

    // ✅ 次の盤面を作る
    const next = ps.filter(
        q =>
            !(q.x === m.p.x && q.y === m.p.y) && // 元の位置
            !(q.x === m.x && q.y === m.y)        // 取られた駒
    );

    // ===== 成り判定 =====
    let promoted = m.p.promoted;
    if (shouldPromote(m.p, m.y)) {
        promoted = mustPromote(m.p, m.y) || Math.random() < 0.5;
    }

    next.push({ ...m.p, x: m.x, y: m.y, promoted });

    // ===== 持ち駒に追加 =====
    if (captured) {
        const handPiece = {
            ...captured,
            x: null,
            y: null,
            side: "gote",      // CPUの持ち駒
            promoted: false,  // 成りはリセット
            id: crypto.randomUUID(), // id重複防止
        };

        setHandPieces([...handPieces, handPiece]);
    }

    // ===== 勝敗判定 =====
    const senteKingAlive = next.some(
        p => p.type === "ou" && p.side === "sente"
    );

    if (!senteKingAlive) {
        setPieces(next);
        setTurn(null);
        alert("後手（CPU）の勝ちです！");
        return;
    }

    playMoveSound();
    setPieces(next);
    setTurn("sente");
}
