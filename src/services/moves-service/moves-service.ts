import { useState } from 'react'

const MOVES_API = import.meta.env.VITE_GET_MOVES_API;
const MAKE_MOVE_API = import.meta.env.VITE_MAKE_MOVE_API;
const GET_TURN_API = import.meta.env.VITE_GET_TURN_API;

interface Move {
  row: number;
  column: number;
}

export function useMoves() {
  const [availableMoves, setAvailableMoves] = useState<Move[]>([]);
  const [playerTurn, setPlayerTurn] = useState<string>("White");
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isCheckmate, setIsCheckmate] = useState<boolean>(false);

  const fetchTurn = async () => {
    try {
      const response = await fetch(GET_TURN_API);
      if (!response.ok) throw new Error("Failed to fetch turn");
      const data = await response.json();
      setPlayerTurn(data);
      return data;
    } catch (error) {
      console.error("Could not fetch turn", error);
    }
  };

  const makeMove = async (from: Move, to: Move) => {
    try {
      const response = await fetch(MAKE_MOVE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to }),
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
    try {
      const url = `${MOVES_API}?row=${row}&column=${column}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch moves");
      }

      const data: Move[] = await response.json();
      setAvailableMoves(data);
      return data;
    } catch (error) {
      console.error("Could not fetch moves", error);
      setAvailableMoves([]);
      throw error;
    }
  };

  return {
    fetchMoves,
    makeMove,
    availableMoves,
    setAvailableMoves,
    playerTurn,
    fetchTurn,
    isCheck,
    isCheckmate
  };
}