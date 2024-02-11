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
      <CursorSVG color={color} />
      {/* TODO: Implement message bar */}
    </div>
  );
};
