import { ChevronRight, ChevronDown, Swords } from "lucide-react";
import { useState } from "react";


interface FriendButtonProps {
  children?: string;
}

const handleChallenge = (username: string) => {
  console.log("challenged " + username)
}

export function FriendButton({ children }: FriendButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="pt-2 flex space-x-1 items-center font-light text-sm uppercase tracking-[0.1em]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-white/10 p-1 rounded-md transition-colors"
        >
          {isOpen ? (
            <ChevronDown size={16} className="mt-[1px]" />
          ) : (
            <ChevronRight size={16} className="mt-[1px]" />
          )}
        </button>
        <span className="cursor-default">{children}</span>
      </div>

      {isOpen && (
        <div className="ml-6 mt-1 flex flex-col space-y-2 normal-case tracking-normal">
          <button className="text-left text-sm flex flex-row hover:bg-white/10 rounded-md w-fit p-1 transition-colors"
            onClick={() => handleChallenge(children!)}>
            <Swords size={16} className="mt-[3px] mr-1 text-amber-300" /> Challenge
          </button>
        </div>
      )}
    </div>
  );
}