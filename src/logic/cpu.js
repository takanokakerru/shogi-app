import { canMove } from "./moveLogic";
import { shouldPromote, mustPromote } from "./promoteLogic";

export function cpuMove(ps, setPieces, setTurn) {
    const moves = [];
    ps.forEach(p => {
        if (p.side !== "gote") return;
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (canMove(p, x, y, ps)) {
                    moves.push({ p, x, y });
                }
            }
        }
    });
    if (!moves.length) return;
    const m = moves[Math.floor(Math.random() * moves.length)];
    const next = ps.filter(
        q => !(q.x === m.p.x && q.y === m.p.y) &&
            !(q.x === m.x && q.y === m.y)
    );
    // ===== 成り判定 =====
    let promoted = m.p.promoted;
    if (shouldPromote(m.p, m.y)) {
        promoted = mustPromote(m.p, m.y) || Math.random() < 0.5;
    }
    next.push({ ...m.p, x: m.x, y: m.y, promoted });
    // ===== 勝敗判定（CPU）=====
    const senteKingAlive = next.some(
        p => p.type === "ou" && p.side === "sente"
    );

    if (!senteKingAlive) {
        setPieces(next);
        setTurn(null);
        alert("後手（CPU）の勝ちです！");
        return;
    }


    setPieces(next);
    setTurn("sente");
}
