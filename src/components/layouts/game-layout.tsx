import { ChessBoard, PrimaryContainer, PrimaryButton } from "@/components/ui"
import { useNavigate } from "react-router-dom";
import { ChessQueen } from "lucide-react";

export function GameLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex p-4 ml-[30%] min-h-screen gap-5 items-center justify-center">
      <PrimaryContainer>
        <PrimaryButton className="flex" onClick={() => navigate('/')}><ChessQueen size={25} className="mt-1 mr-5" />Go back</PrimaryButton>
      </PrimaryContainer>
      <PrimaryContainer>
        <ChessBoard />
      </PrimaryContainer>
    </div>
  );
}