import { useState } from 'react'

const MOVES_API = import.meta.env.VITE_GET_MOVES_API;

interface Move {
  row: number;
  column: number;
}

export function useMoves() {
  const [availableMoves, setAvailableMoves] = useState<Move[]>([]);

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

  return { fetchMoves, availableMoves, setAvailableMoves };
}