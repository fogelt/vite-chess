import { useState, useEffect } from 'react';
import { useAuth } from '@/services';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Move { row: number; column: number; }

export function useMoves(gameId: string | null, connection: any, onOpponentMove: (board: any) => void, setOpponent: any) {
  const [availableMoves, setAvailableMoves] = useState<Move[]>([]);
  const [playerTurn, setPlayerTurn] = useState<string>("White");
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isCheckmate, setIsCheckmate] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<{ winner: string; reason: string } | null>(null);
  const { getUserId } = useAuth();

  const [whiteTime, setWhiteTime] = useState<number>(600000);
  const [blackTime, setBlackTime] = useState<number>(600000);

  // Handle SignalR Listeners
  useEffect(() => {
    if (!connection) return;

    connection.on("ReceiveMove", (data: any) => {
      setPlayerTurn(data.currentTurn);
      setIsCheck(data.isCheck);
      setIsCheckmate(data.isCheckmate);
      onOpponentMove(data.board);
      setWhiteTime(data.whiteTimeMs);
      setBlackTime(data.blackTimeMs);

      if (data.isGameOver) {
        setGameOver({
          winner: data.winner,
          reason: data.reason
        });
      }
    });

    connection.on("OpponentJoined", (data: any) => {
      setOpponent(data);
    });

    return () => {
      connection.off("ReceiveMove");
      connection.off("OpponentJoined");
    };
  }, [connection, onOpponentMove, setOpponent]);

  const makeMove = async (from: Move, to: Move) => {
    if (!gameId) return;
    const response = await fetch(`${BASE_URL}/api/game/make-move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, userId: getUserId(), from, to }),
    });
    const data = await response.json();
    setAvailableMoves([]);
    setPlayerTurn(data.currentTurn);
    setIsCheck(data.isCheck);
    setIsCheckmate(data.isCheckmate);
    setWhiteTime(data.whiteTimeMs);
    setBlackTime(data.blackTimeMs);
    if (data.isGameOver) {
      setGameOver({ winner: data.winner, reason: data.reason });
    }
    return data.board;
  };

  const fetchMoves = async (row: number, column: number) => {
    if (!gameId) return;
    const response = await fetch(`${BASE_URL}/api/game/${gameId}/get-moves?row=${row}&column=${column}`);
    const data = await response.json();
    setAvailableMoves(data);
    return data;
  };

  return { fetchMoves, makeMove, availableMoves, setAvailableMoves, playerTurn, isCheck, isCheckmate, whiteTime, blackTime, setWhiteTime, setBlackTime, gameOver };
}