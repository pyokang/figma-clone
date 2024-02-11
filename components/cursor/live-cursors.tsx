import type { LiveCursorProps } from "@/types/type";
import { COLORS } from "@/constants";
import { Cursor } from "./cursor";

export const LiveCursors = ({ others }: LiveCursorProps) => {
  return others.map(({ connectionId, presence }) => {
    if (!presence?.cursor) return null;

    const { cursor, message } = presence;
    return (
      <Cursor
        key={connectionId}
        color={COLORS[Number(connectionId) % COLORS.length]}
        x={cursor.x}
        y={cursor.y}
        message={message}
      />
    );
  });
};
