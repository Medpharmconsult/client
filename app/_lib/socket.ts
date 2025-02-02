"use client";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;

export default function useSocket(token: string) {
  useEffect(() => {
    if (!socket) {
      socket = io(`${process.env.NEXT_PUBLIC_Host_Name}`);
      socket?.on("connect", () => {
        const user = jwtDecode(`${token}`) as { userID: string };
        socket?.emit("addActiveUser", user.userID);
      });
    }
  }, []);
  return socket;
}

export const disconnectSocket = (token: string) => {
  if (socket && typeof window !== "undefined") {
    const user = jwtDecode(`${token}`) as { userID: string };
    socket.emit("removeActiveUser", user.userID, () => {
      socket?.disconnect();
      socket = null;
    });
  }
};
