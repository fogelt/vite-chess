import { ChessBoard, PrimaryContainer } from "@/components/ui"
import { useNavigate } from "react-router-dom";

export function GameLayout() {
  return (
    <div className="flex p-4 mr-[30%] min-h-screen items-center justify-center">
      <PrimaryContainer>
        <ChessBoard />
      </PrimaryContainer>
    </div>
  );
}