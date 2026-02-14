import { DecoBoard, PrimaryButton, PrimaryContainer } from "@/components/ui"
import { ChessQueen, Bot, Contact, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function LandingLayout() {
  const navigate = useNavigate();

  const wrapperClass = "animate-in fade-in slide-in-from-bottom-24 duration-700 fill-mode-backwards min-w-[22vw]";
  const containerClass = "flex flex-col items-center justify-center gap-5 transition-transform duration-200 hover:scale-[1.05]";

  return (
    <div className="flex min-h-screen lg:flex-row flex-col items-center justify-center lg:ml-[20%] gap-10">

      <div className={`${wrapperClass} delay-150`}>
        <PrimaryContainer className={containerClass}>
          <DecoBoard />
          <PrimaryButton className="flex min" onClick={() =>
            navigate('/game', { state: { mode: false } })}>
            <ChessQueen size={25} className="mt-1 mr-5 text-white" /> Play random
          </PrimaryButton>
        </PrimaryContainer>
      </div>

      <div className={`${wrapperClass} delay-300`}>
        <PrimaryContainer className={`${containerClass}`}>
          <DecoBoard />
          <PrimaryButton className="flex min" onClick={() =>
            navigate('/game', { state: { mode: true } })}>
            <Bot size={25} className="mt-1 mr-5 text-white" /> Play robot
          </PrimaryButton>
        </PrimaryContainer>
      </div>

    </div>
  );
}