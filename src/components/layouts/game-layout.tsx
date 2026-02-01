import { ChessBoard, PrimaryContainer, PrimaryButton } from "@/components/ui"
import { useNavigate } from "react-router-dom";
import { ChessQueen, ChessBishop } from "lucide-react";
import { useStart } from "@/services";
import { useState } from "react";

export function GameLayout() {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState(0);
  const { startGame } = useStart();

  const handleStart = async () => {
    await startGame();
    setGameId(prev => prev + 1); // Changing this forces ChessBoard to "reload"
  };

  return (
    <div className="flex p-4 ml-[30%] min-h-screen gap-5 items-center justify-center">
      <PrimaryContainer>
        <PrimaryButton className="flex" onClick={handleStart}><ChessQueen size={25} className="mt-1 mr-5" />Start</PrimaryButton>
        <PrimaryButton className="flex" onClick={() => navigate('/')}><ChessBishop size={25} className="mt-1 mr-5" />Go back</PrimaryButton>
      </PrimaryContainer>
      <PrimaryContainer>
        <ChessBoard key={gameId} />
      </PrimaryContainer>
    </div>
  );
}