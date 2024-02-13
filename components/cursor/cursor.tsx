import CursorSVG from "@/public/assets/CursorSVG";

type TProps = {
  color: string;
  x: number;
  y: number;
  message: string;
};

export const Cursor = ({ color, x, y, message }: TProps) => {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      {/* Cursor */}
      <CursorSVG color={color} />
      {/* Cursor message */}
      {message && (
        <div className="absolute left-2 top-5 rounded-3xl px-4 py-2" style={{ backgroundColor: color }}>
          <p className="text-white whitespace-nowrap text-sm leading-relaxed">{message}</p>
        </div>
      )}
    </div>
  );
};
