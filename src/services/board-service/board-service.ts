import { useState, useEffect } from "react";

const BOARD_API = import.meta.env.VITE_GET_BOARD_API

export function usePieces() {
  const [piece, setPiece] = useState("");

  useEffect(() => {
    async function fetchPiece() {
      try {
        const response = await fetch(BOARD_API);

        if (!response.ok) {
          throw new Error("Failed to fetch piece");
        }

        const data = await response.json();
        setPiece(data.piece);
      } catch (error) {
        console.error("Error getting piece:", error);
      }
    }

    fetchPiece();
  }, []);

  return { piece, setPiece };
}