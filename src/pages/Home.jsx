import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ textAlign: "center", marginTop: 80 }}>
            <h1>将棋アプリ</h1>
            <p>CPUと対戦できる将棋ゲームです</p>

            <Link to="/game">
                <button style={{ fontSize: 20, padding: "10px 30px" }}>
                    ▶ ゲーム開始
                </button>
            </Link>
        </div>
    );
}
