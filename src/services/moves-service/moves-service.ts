import { useState } from 'react'

const MOVES_API = import.meta.env.VITE_GET_MOVES_API;
const MAKE_MOVE_API = import.meta.env.VITE_MAKE_MOVE_API;

interface Move {
  row: number;
  column: number;
}

export function useMoves() {
  const [availableMoves, setAvailableMoves] = useState<Move[]>([]);

  const makeMove = async (from: Move, to: Move) => {
    try {
      const response = await fetch(MAKE_MOVE_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to }),
      });

      if (!response.ok) throw new Error("Failed to make move");

      const updatedBoard = await response.json();
      setAvailableMoves([]);
      return updatedBoard;
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

  return { fetchMoves, makeMove, availableMoves, setAvailableMoves };
}