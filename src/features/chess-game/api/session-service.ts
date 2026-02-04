import { useState, useEffect } from 'react';
import { useAuth } from '@/services';
import * as signalR from "@microsoft/signalr";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const HUB_URL = import.meta.env.VITE_HUB_URL;

export function useGameSession(gameId: string | null) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [myColor, setMyColor] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<{ username: string, elo: number } | null>(null);
  const { getUserId } = useAuth();

  useEffect(() => {
    if (!gameId) return;

    const username = localStorage.getItem("username") || localStorage.getItem("chess_user_id") || "Guest";
    const elo = Number(localStorage.getItem("elo"));

    const assignRole = async () => {
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
    };

    assignRole();

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

    newConnection.start().then(() => {
      newConnection.invoke("JoinGame", gameId, username, elo);
    }).catch(err => console.error("SignalR Connection Error: ", err));

    setConnection(newConnection);

    return () => {
      newConnection.stop();
      setMyColor(null);
      setOpponent(null);
    };
  }, [gameId]);

  return { connection, myColor, opponent, setOpponent };
}