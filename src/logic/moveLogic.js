export function isPathClear(fromX, fromY, toX, toY, pieces) {
    const dx = Math.sign(toX - fromX);
    const dy = Math.sign(toY - fromY);
    let x = fromX + dx;
    let y = fromY + dy;

    while (x !== toX || y !== toY) {
        if (pieces.some(p => p.x === x && p.y === y)) return false;
        x += dx;
        y += dy;
    }
    return true;
}

export function canMove(p, x, y, pieces) {
    if (x < 0 || x >= 9 || y < 0 || y >= 9) return false;

    // ★ 移動先に自分の駒があったらNG
    const target = pieces.find(q => q.x === x && q.y === y);
    if (target && target.side === p.side) return false;
    const dx = x - p.x;
    const dy = y - p.y;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);
    const dir = p.side === "sente" ? -1 : 1;

    if (p.promoted) {
        if (p.type === "hisha") {
            // 飛車成り（竜）：縦横は元の飛車、斜め1マス追加
            if ((dx === 0 || dy === 0) && isPathClear(p.x, p.y, x, y, pieces)) return true;
            if (adx === 1 && ady === 1) return true;
            return false;
        } else if (p.type === "kaku") {
            // 角成り（馬）：斜めは元の角、縦横1マス追加
            if (adx === ady && isPathClear(p.x, p.y, x, y, pieces)) return true;
            if ((adx === 1 && dy === 0) || (dx === 0 && ady === 1)) return true;
            return false;
        } else {
            // 歩・香・桂・銀・金は金と同じ動き
            return (
                (dx === 0 && dy === dir) ||
                (adx === 1 && dy === dir) ||
                (adx === 1 && dy === 0) ||
                (dx === 0 && dy === -dir)
            );
        }
    }

    switch (p.type) {
        case "fu": return dx === 0 && dy === dir;
        case "kyo": return dx === 0 && dy * dir > 0 && isPathClear(p.x, p.y, x, y, pieces);
        case "kei": return adx === 1 && dy === 2 * dir;
        case "gin": return (adx === 1 && ady === 1) || (dx === 0 && dy === dir);
        case "kin": return (
            (dx === 0 && dy === dir) ||
            (adx === 1 && dy === dir) ||
            (adx === 1 && dy === 0) ||
            (dx === 0 && dy === -dir)
        );
        case "ou": return adx <= 1 && ady <= 1;
        case "kaku": return adx === ady && isPathClear(p.x, p.y, x, y, pieces);
        case "hisha": return (dx === 0 || dy === 0) && isPathClear(p.x, p.y, x, y, pieces);
        default: return false;
    }
}


export function canMoveTo(x, y, pieces, selectedIndex) {
    if (selectedIndex === null) return false;

    const piece = pieces[selectedIndex];
    if (!piece) return false;

    return canMove(piece, x, y, pieces);
}
