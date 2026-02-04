import { useState, useEffect } from 'react';
import { useAuth } from '@/services';
import * as signalR from "@microsoft/signalr";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const HUB_URL = import.meta.env.VITE_HUB_URL;

export function useGameSession(gameId: string | null) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [myColor, setMyColor] = useState<string | null>(null);
  const [opponent, setOpponent] = useState<{ username: string, elo: string } | null>(null);
  const { getUserId } = useAuth();

  useEffect(() => {
    if (!gameId) return;

    const assignRole = async () => {
      const username = localStorage.getItem("username");
      const elo = localStorage.getItem("elo");

      const response = await fetch(`${BASE_URL}/api/game/assign-player`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, userId: getUserId(), username, elo }),
      });
      const data = await response.json();
      setMyColor(data.color);
      if (data.opponent) setOpponent(data.opponent);
    };

    assignRole();

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

    newConnection.start().then(() => {
      newConnection.invoke("JoinGame", gameId,
        localStorage.getItem("username"),
        localStorage.getItem("elo")
      );
    });

    setConnection(newConnection);
    return () => { newConnection.stop(); };
  }, [gameId]);

  return { connection, myColor, opponent, setOpponent };
}