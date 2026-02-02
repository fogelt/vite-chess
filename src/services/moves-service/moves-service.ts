import { useState, useEffect } from 'react'
import { UseUser } from '@/services';
import * as signalR from "@microsoft/signalr";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const HUB_URL = import.meta.env.VITE_HUB_URL;

interface Move {
  row: number;
  column: number;
}

export function useMoves(gameId: string | null, onOpponentMove: (board: any) => void) {
  const [availableMoves, setAvailableMoves] = useState<Move[]>([]);
  const [playerTurn, setPlayerTurn] = useState<string>("White");
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isCheckmate, setIsCheckmate] = useState<boolean>(false);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  const [myColor, setMyColor] = useState<string | null>(null);
  const { getUserId } = UseUser();

  //Initialize user
  useEffect(() => {
    const assignRole = async () => {
      if (!gameId) return;

      try {
        const response = await fetch(`${BASE_URL}/api/game/assign-player`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId, userId: getUserId() }),
        });
        const data = await response.json();
        setMyColor(data.color);
      } catch (e) {
        console.error("Failed to assign player role", e);
      }
    };

    assignRole();
  }, [gameId]);

  // Initialize SignalR Connection
  useEffect(() => {
    if (!gameId) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [gameId]);

  // Start connection and Join Group
  useEffect(() => {
    if (connection && gameId) {
      connection.start()
        .then(() => {
          connection.invoke("JoinGame", gameId);

          connection.on("ReceiveMove", (data) => {
            setPlayerTurn(data.currentTurn);
            setIsCheck(data.isCheck);
            setIsCheckmate(data.isCheckmate);
            onOpponentMove(data.board);
          });
        })
        .catch(e => console.error("SignalR Connection Failed: ", e));
    }
    return () => { connection?.stop(); };
  }, [connection, gameId, onOpponentMove]);

  const makeMove = async (from: Move, to: Move) => {
    if (!gameId) return;
    try {
      const response = await fetch(`${BASE_URL}/api/game/make-move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, userId: getUserId(), from, to }),
      });

      if (!response.ok) throw new Error("Failed to make move");
      const data = await response.json();

      setAvailableMoves([]);
      setPlayerTurn(data.currentTurn);
      setIsCheck(data.isCheck);
      setIsCheckmate(data.isCheckmate);

      return data.board;
    } catch (error) {
      console.error("Move Error:", error);
      throw error;
    }
  };

  const fetchMoves = async (row: number, column: number) => {
    if (!gameId) return;
    try {
      const url = `${BASE_URL}/api/game/${gameId}/get-moves?row=${row}&column=${column}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch moves");

      const data: Move[] = await response.json();
      setAvailableMoves(data);
      return data;
    } catch (error) {
      setAvailableMoves([]);
      throw error;
    }
  };

  const resetMoveState = () => {
    setIsCheckmate(false);
    setIsCheck(false);
    setAvailableMoves([]);
  };

  return {
    fetchMoves,
    makeMove,
    availableMoves,
    setAvailableMoves,
    playerTurn,
    isCheck,
    isCheckmate,
    resetMoveState
  };
}