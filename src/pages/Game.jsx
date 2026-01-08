import ShogiBoard from "../components/ShogiBoard";
import { useNavigate } from "react-router-dom";

export default function Game() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/")}>← 戻る</button>
            <ShogiBoard />
        </div>
    );
}
