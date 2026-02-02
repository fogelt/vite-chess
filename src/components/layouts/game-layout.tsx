import { PrimaryContainer, PrimaryButton } from "@/components/ui"
import { ChessBoard, ChessPlayer, ChessModal } from '@/components/features'
import { useNavigate, useParams } from "react-router-dom";
import { ChessQueen, ChessBishop } from "lucide-react";
import { useStart, useMoves, useBoard } from "@/services";
import { useEffect } from "react";

export function GameLayout() {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  const { startGame } = useStart();
  const { board, setBoard, fetchBoard } = useBoard();
  const { fetchMoves, availableMoves, setAvailableMoves, makeMove, playerTurn, isCheckmate, resetMoveState, myColor } = useMoves(gameId || null, setBoard);

  const isUserBlack = myColor === "Black";
  const opponentColor = isUserBlack ? "White" : "Black";

  const handleStart = async () => {
    resetMoveState();
    const data = await startGame();
    if (data?.gameId) {
      navigate(`/game/${data.gameId}`);
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchBoard(gameId);
    }
  }, [gameId]);

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

      <PrimaryContainer className="flex flex-1 flex-row items-center justify-center">
        <div className="flex flex-col h-full relative items-center justify-between py-12">
          <ChessPlayer playerColor={opponentColor} playerName={`${opponentColor} player`} playerTurn={playerTurn} />
          <ChessPlayer playerColor={myColor} playerName={`${myColor} player`} playerTurn={playerTurn} />
        </div>

        <div className="relative flex-shrink-0 h-fit w-fit">
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
        </div>
      </PrimaryContainer>

    </div>
  );
}