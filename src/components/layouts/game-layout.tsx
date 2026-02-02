import { PrimaryContainer, PrimaryButton } from "@/components/ui"
import { ChessBoard, ChessPlayer } from '@/components/features'
import { useNavigate } from "react-router-dom";
import { ChessQueen, ChessBishop } from "lucide-react";
import { useStart, useMoves, useBoard } from "@/services";

export function GameLayout() {
  const navigate = useNavigate();
  const { startGame, } = useStart();
  const { fetchMoves, availableMoves, setAvailableMoves, makeMove, playerTurn, fetchTurn } = useMoves();
  const { board, setBoard, fetchBoard } = useBoard();

  const handleStart = async () => {
    await startGame();
    await fetchBoard();
    await fetchTurn();
  };

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
        <div className="self-end mb-10">
          <ChessPlayer playerColor="White" playerName="Player1" playerTurn={playerTurn} />
        </div>

        <div className="flex-shrink-0">
          <ChessBoard
            board={board}
            setBoard={setBoard}
            fetchMoves={fetchMoves}
            availableMoves={availableMoves}
            setAvailableMoves={setAvailableMoves}
            makeMove={makeMove}
          />
        </div>

        <div className="self-start mt-10">
          <ChessPlayer playerColor="Black" playerName="Player2" playerTurn={playerTurn} />
        </div>
      </PrimaryContainer>

    </div>
  );
}