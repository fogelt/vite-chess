import { Trophy, Coins, LogOut } from "lucide-react";
import bgImage from '@/assets/avatar-1.webp';
import { PrimaryContainer, PrimaryButton } from "@/components/ui";

interface UserData {
  username: string;
  eloRating: number;
  coins: number;
}

export function UserDashboard({ user, onLogout }: { user: UserData, onLogout: () => void }) {
  return (
    <div className="flex flex-col h-full space-y-6 text-white">
      <div className="flex items-center space-x-3 pb-4 border-b border-white/20">
        <span
          className={`w-16 h-16 rounded-full transition-all duration-500 shadow-lg inline-block bg-cover bg-center ring-white/80 ring-2 ring-inset`}
          style={{ backgroundImage: `url(${bgImage})` }} />
        <div>
          <h2 className="text-xl text-white/70 tracking-[0.2em]">{user.username}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <PrimaryContainer className="rounded-lg flex items-center justify-between h-7">
          <div className="flex items-center space-x-3">
            <Trophy className="text-amber-300" size={20} />
            <span className="text-white/70 font-light text-lg uppercase tracking-[0.2em]">Rating</span>
          </div>
          <span className="text-white/70 font-light text-lg uppercase tracking-[0.2em] font-mono">{user.eloRating}</span>
        </PrimaryContainer>

        <PrimaryContainer className="rounded-lg flex items-center justify-between h-7">
          <div className="flex items-center space-x-3">
            <Coins className="text-amber-300" size={20} />
            <span className="text-white/70 font-light text-lg uppercase tracking-[0.2em]">Coins</span>
          </div>
          <span className="text-white/70 font-light text-lg uppercase tracking-[0.2em] font-mono">{user.coins}</span>
        </PrimaryContainer>
      </div>

      <div className="flex-grow" />

      <PrimaryButton
        onClick={onLogout} className="flex w-fit">
        <LogOut size={25} className="text-white" />
      </PrimaryButton>
    </div>
  );
}