import { IMAGES } from "./images";

let id = 1;

export const initialPieces = [
    // ===== 後手 =====
    { id: id++, x: 0, y: 0, type: "kyo", side: "gote", promoted: false },
    { id: id++, x: 1, y: 0, type: "kei", side: "gote", promoted: false },
    { id: id++, x: 2, y: 0, type: "gin", side: "gote", promoted: false },
    { id: id++, x: 3, y: 0, type: "kin", side: "gote", promoted: false },
    { id: id++, x: 4, y: 0, type: "ou", side: "gote", promoted: false },
    { id: id++, x: 5, y: 0, type: "kin", side: "gote", promoted: false },
    { id: id++, x: 6, y: 0, type: "gin", side: "gote", promoted: false },
    { id: id++, x: 7, y: 0, type: "kei", side: "gote", promoted: false },
    { id: id++, x: 8, y: 0, type: "kyo", side: "gote", promoted: false },

    { id: id++, x: 1, y: 1, type: "hisha", side: "gote", promoted: false },
    { id: id++, x: 7, y: 1, type: "kaku", side: "gote", promoted: false },

    ...Array.from({ length: 9 }, (_, i) => ({
        id: id++,
        x: i,
        y: 2,
        type: "fu",
        side: "gote",
        promoted: false,
    })),

    // ===== 先手 =====
    ...Array.from({ length: 9 }, (_, i) => ({
        id: id++,
        x: i,
        y: 6,
        type: "fu",
        side: "sente",
        promoted: false,
    })),

    { id: id++, x: 1, y: 7, type: "kaku", side: "sente", promoted: false },
    { id: id++, x: 7, y: 7, type: "hisha", side: "sente", promoted: false },

    { id: id++, x: 0, y: 8, type: "kyo", side: "sente", promoted: false },
    { id: id++, x: 1, y: 8, type: "kei", side: "sente", promoted: false },
    { id: id++, x: 2, y: 8, type: "gin", side: "sente", promoted: false },
    { id: id++, x: 3, y: 8, type: "kin", side: "sente", promoted: false },
    { id: id++, x: 4, y: 8, type: "ou", side: "sente", promoted: false },
    { id: id++, x: 5, y: 8, type: "kin", side: "sente", promoted: false },
    { id: id++, x: 6, y: 8, type: "gin", side: "sente", promoted: false },
    { id: id++, x: 7, y: 8, type: "kei", side: "sente", promoted: false },
    { id: id++, x: 8, y: 8, type: "kyo", side: "sente", promoted: false },
];
