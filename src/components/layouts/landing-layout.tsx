import { DecoBoard, PrimaryButton, PrimaryContainer } from "@/components/ui"
import { ChessQueen, Bot, Contact } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center ml-[20%] gap-10">
      <PrimaryContainer className="flex flex-col items-center justify-center gap-5 hover:scale-[1.05] duration-200">
        <DecoBoard />
        <PrimaryButton className="flex" onClick={() => navigate('/game')}><Contact size={25} className="mt-1 mr-5 text-amber-300" />Play friend</PrimaryButton>
      </PrimaryContainer>
      <PrimaryContainer className="flex flex-col items-center justify-center gap-5 hover:scale-[1.05] duration-200">
        <DecoBoard />
        <PrimaryButton className="flex" onClick={() => navigate('/game')}><ChessQueen size={25} className="mt-1 mr-5 text-amber-300" />Play random</PrimaryButton>
      </PrimaryContainer>
      <PrimaryContainer className="flex flex-col items-center justify-center gap-5 hover:scale-[1.05] duration-200">
        <DecoBoard />
        <PrimaryButton className="flex" onClick={() => navigate('/game')}><Bot size={25} className="mt-1 mr-5 text-amber-300" />Play robot</PrimaryButton>
      </PrimaryContainer>
    </div>
  );
}