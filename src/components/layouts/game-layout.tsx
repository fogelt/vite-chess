import { PrimaryContainer, PrimaryButton } from "@/components/ui"
import { ChessBoard, ChessPlayer, ChessModal } from '@/features'
import { useNavigate, useParams } from "react-router-dom";
import { ChessQueen, ChessBishop, Users } from "lucide-react";
import { useStart, useMoves, useBoard, useGameSession } from "@/features/chess-game/api";
import { useEffect } from "react";

export function GameLayout() {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  const { startGame } = useStart();
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

  const handleStart = async () => {
    const data = await startGame();
    if (data?.gameId) {
      navigate(`/game/${data.gameId}`);
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchBoard(gameId);
    }
  }, [gameId, fetchBoard]);

  return (
    <div className="flex h-screen w-full p-8 gap-8 overflow-hidden">
      <div className="flex flex-col w-1/3 justify-between h-full">

        <PrimaryContainer className="flex flex-col gap-3">
          <PrimaryButton className="flex w-full" onClick={handleStart}>
            <ChessQueen size={25} className="mr-3" />
            Start Game
          </PrimaryButton>
          <PrimaryButton className="flex w-full" onClick={() => navigate('/')}>
            <ChessBishop size={25} className="mr-3" />
            Go Back
          </PrimaryButton>
        </PrimaryContainer>
      </div>

      <PrimaryContainer className="flex flex-1 flex-col items-center justify-center">
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
              <PrimaryButton onClick={handleStart} className="mt-6">
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