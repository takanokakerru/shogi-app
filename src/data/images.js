import fu from "../assets/fu.png";
import kyo from "../assets/kyo.png";
import kei from "../assets/kei.png";
import gin from "../assets/gin.png";
import kin from "../assets/kin.png";
import kaku from "../assets/kaku.png";
import hisha from "../assets/hisha.png";
import ou from "../assets/ou.png";

import to from "../assets/to.png";
import narikyo from "../assets/narikyo.png";
import narikei from "../assets/narikei.png";
import narigin from "../assets/narigin.png";
import uma from "../assets/uma.png";
import ryu from "../assets/ryu.png";

export const IMAGES = {
    normal: { fu, kyo, kei, gin, kin, kaku, hisha, ou },
    promoted: {
        fu: to,
        kyo: narikyo,
        kei: narikei,
        gin: narigin,
        kaku: uma,
        hisha: ryu
    }
};
