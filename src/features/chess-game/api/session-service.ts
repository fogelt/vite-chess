import { useState, useEffect } from 'react';
import { useAuth } from '@/services';
import * as signalR from "@microsoft/signalr";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const HUB_URL = import.meta.env.VITE_HUB_URL;

export function useGameSession(gameId: string | null) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [myColor, setMyColor] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<{ username: string, elo: number } | null>(null);
  const [isOpponentConnected, setIsOpponentConnected] = useState(true);
  const { getUserId } = useAuth();


  useEffect(() => {
    if (!connection || !gameId) return;
    connection.on("PlayerStatusUpdate", (data: { userId: string, isConnected: boolean }) => {
      if (data.userId !== getUserId()) {
        setIsOpponentConnected(data.isConnected);
      }
    });

    return () => {
      connection.off("PlayerStatusUpdate");
    };
  }, [connection, gameId, getUserId]);

  useEffect(() => {
    if (!gameId) return;

    const username = localStorage.getItem("username") || localStorage.getItem("chess_user_id") || "Guest";
    const elo = Number(localStorage.getItem("elo"));

    const initSession = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/game/assign-player`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId, userId: getUserId(), username, elo }),
        });
        const data = await response.json();
        setMyColor(data.color);
        if (data.opponent) setOpponent(data.opponent);
      } catch (err) {
        console.error("Failed to assign role:", err);
      }

      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(HUB_URL)
        .withAutomaticReconnect()
        .build();

      try {
        await newConnection.start();
        setConnection(newConnection);
      } catch (err) {
        console.error("SignalR Connection Error: ", err);
      }
    };

    initSession();

    return () => {
      if (connection) connection.stop();
      setMyColor(null);
      setOpponent(null);
    };
  }, [gameId]);

  useEffect(() => {
    if (connection?.state === signalR.HubConnectionState.Connected && gameId && myColor) {
      const userId = getUserId();
      const username = localStorage.getItem("username") || localStorage.getItem("chess_user_id") || "Guest";
      const elo = Number(localStorage.getItem("elo"));

      connection.invoke("JoinGame", gameId, userId, username, elo)
        .catch(err => console.error("JoinGame Error:", err));
    }
  }, [connection, gameId, myColor]);

  return { connection, myColor, opponent, setOpponent, isOpponentConnected };
}