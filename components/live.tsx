"use client";

import { useMyPresence, useOthers } from "@/liveblocks.config";
import { LiveCursors } from "./cursor/live-cursors";
import { useCallback, useEffect, useState } from "react";
import { CursorChat } from "./cursor/cursor-chat";
import { CursorMode } from "@/types/type";

export const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState({
    mode: CursorMode.Hidden,
  });

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const { x, y } = event.currentTarget.getBoundingClientRect();
    const currentX = event.clientX - x;
    const currentY = event.clientY - y;

    updateMyPresence({ cursor: { x: currentX, y: currentY } });
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    setCursorState({
      mode: CursorMode.Hidden,
    });

    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const { x, y } = event.currentTarget.getBoundingClientRect();
    const currentX = event.clientX - x;
    const currentY = event.clientY - y;

    updateMyPresence({ cursor: { x: currentX, y: currentY } });
  }, []);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="h-[100dvh] w-full flex justify-center items-center text-center"
    >
      <h1 className="text-2xl text-white">Trying to clone</h1>

      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}

      <LiveCursors others={others} />
    </div>
  );
};
