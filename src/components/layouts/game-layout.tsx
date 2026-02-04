import { PrimaryContainer, PrimaryButton } from "@/components/ui"
import { ChessBoard, ChessPlayer, ChessModal } from '@/features'
import { useNavigate, useParams } from "react-router-dom";
import { useMatchmaking, useMoves, useBoard, useGameSession } from "@/features/chess-game/api";
import { useEffect, useRef } from "react";

export function GameLayout() {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  const { findOrCreateMatch } = useMatchmaking();
  const { board, setBoard, fetchBoard } = useBoard();

  const { connection, myColor, opponent, setOpponent } = useGameSession(gameId || null);

  const {
    fetchMoves,
    availableMoves,
    setAvailableMoves,
    makeMove,
    playerTurn,
    isCheckmate
  } = useMoves(gameId || null, connection, setBoard, setOpponent);

  const isUserBlack = myColor === "Black";
  const opponentColor = isUserBlack ? "White" : "Black";

  const userStats = {
    username: String(localStorage.getItem("username") || "Guest"),
    eloRating: Number(localStorage.getItem("elo") || 800)
  };

  const matchmakingStarted = useRef(false);

  useEffect(() => {
    const initMatch = async () => {
      if (gameId || matchmakingStarted.current) return;
      matchmakingStarted.current = true;

      try {
        const data = await findOrCreateMatch();
        if (data?.gameId) {
          navigate(`/game/${data.gameId}`, { replace: true });
        }
      } catch (e) {
        matchmakingStarted.current = false;
        console.error("Matchmaking failed", e);
      }
    };

    initMatch();
  }, [gameId, findOrCreateMatch, navigate]);

  useEffect(() => {
    if (gameId) {
      fetchBoard(gameId);
    }
  }, [gameId, fetchBoard]);

  return (
    <div className="flex h-screen w-full p-8 gap-8 overflow-hidden items-center justify-center">
      <PrimaryContainer className="flex-col items-center justify-center">
        <div className="relative">
          <ChessPlayer playerColor={opponentColor} playerName={`${opponent?.username || "Waiting for opponent..."}`} elo={opponent?.elo.toString()} />
          <ChessBoard
            board={board}
            setBoard={setBoard}
            fetchMoves={fetchMoves}
            availableMoves={availableMoves}
            setAvailableMoves={setAvailableMoves}
            makeMove={makeMove}
            isFlipped={isUserBlack}
          />
          {isCheckmate && (
            <ChessModal>
              <h2 className="text-2xl mb-4">Checkmate!</h2>
              <p>{playerTurn === "White" ? "Black" : "White"} wins the game.</p>
              <PrimaryButton onClick={() => { navigate("/game") }} className="mt-6">
                Play Again
              </PrimaryButton>
            </ChessModal>
          )}
          <ChessPlayer playerColor={myColor} playerName={userStats?.username} elo={userStats.eloRating.toString()} />
        </div>
      </PrimaryContainer>

    </div>
  );
}