"use client";

import { useMyPresence, useOthers } from "@/liveblocks.config";
import { LiveCursors } from "./cursor/live-cursors";
import { useCallback } from "react";

export const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const { x, y } = event.currentTarget.getBoundingClientRect();
    const currentX = event.clientX - x;
    const currentY = event.clientY - y;

    updateMyPresence({ cursor: { x: currentX, y: currentY } });
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const { x, y } = event.currentTarget.getBoundingClientRect();
    const currentX = event.clientX - x;
    const currentY = event.clientY - y;

    updateMyPresence({ cursor: { x: currentX, y: currentY } });
  }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="h-[100dvh] w-full flex justify-center items-center text-center"
    >
      <h1 className="text-2xl text-white">Trying to clone</h1>

      <LiveCursors others={others} />
    </div>
  );
};
