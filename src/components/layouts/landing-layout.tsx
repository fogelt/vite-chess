import { PrimaryButton, PrimaryContainer } from "@/components/ui"
import { ChessQueen, ChessBishop } from "lucide-react";

export function LandingLayout() {
  return (
    <div className="flex p-4 ml-[30%] min-h-screen items-center justify-center">
      <PrimaryContainer>
        <PrimaryButton className="flex"><ChessQueen size={25} className="mt-1 mr-5" />Play random</PrimaryButton>
        <PrimaryButton className="flex line-through"><ChessBishop size={25} className="mt-1 mr-5" />New Lobby</PrimaryButton>
      </PrimaryContainer>
    </div>
  );
}