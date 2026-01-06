export function shouldPromote(p, y) {
    if (p.promoted) return false;

    // 成り駒対応
    if (!["fu", "kyo", "kei", "gin", "kaku", "hisha"].includes(p.type)) return false;

    // 先手の敵陣はy=0,1,2、後手の敵陣はy=6,7,8
    const inEnemyCamp = (p.side === "sente" && y <= 2) || (p.side === "gote" && y >= 6);

    return inEnemyCamp;
}

export function mustPromote(p, y) {
    // 歩・香・桂のみ強制成り判定
    if (p.side === "sente") {
        if (p.type === "kei" && y <= 0) return true;
        if ((p.type === "fu" || p.type === "kyo") && y === 0) return true;
    } else {
        if (p.type === "kei" && y >= 8) return true;
        if ((p.type === "fu" || p.type === "kyo") && y === 8) return true;
    }
    return false;
}
