import { PrimaryButton, PrimaryContainer } from "@/components/ui"
import { ChessQueen, ChessBishop } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <PrimaryContainer>
        <PrimaryButton className="flex" onClick={() => navigate('/game')}><ChessQueen size={25} className="mt-1 mr-5 text-amber-200" />Play random</PrimaryButton>
      </PrimaryContainer>
    </div>
  );
}