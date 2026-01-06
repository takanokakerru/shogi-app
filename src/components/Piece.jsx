import { IMAGES } from "../data/images";

export default function Piece({ x, y, type, side, promoted, selected }) {
  const cellSize = 60;
  const cx = x * cellSize + cellSize / 2;
  const cy = y * cellSize + cellSize / 2;

  const image = promoted ? IMAGES.promoted[type] : IMAGES.normal[type];
  if (!image) return null;

  return (
    <>
      <image
        href={image}
        x={x * cellSize}
        y={y * cellSize}
        width={cellSize}
        height={cellSize}
        transform={side === "gote" ? `rotate(180 ${cx} ${cy})` : undefined}
        style={{ pointerEvents: "none" }}
      />
      {selected && (
        <rect
          x={x * cellSize}
          y={y * cellSize}
          width={cellSize}
          height={cellSize}
          fill="none"
          stroke="red"
          strokeWidth="3"
        />
      )}
    </>
  );
}
