import { Trophy, Coins, LogOut, Contact, PlusIcon } from "lucide-react";
import bgImage from '@/assets/avatar-1.webp';
import { PrimaryContainer, PrimaryButton, FeedbackModal } from "@/components/ui";
import { FriendButton } from "../friend-button/friend-button";
import { useAuth } from "@/services";
import { useState } from "react";


export function UserDashboard({ onLogout }: { onLogout: () => void }) {
  const { user, addFriend, loading } = useAuth();
  const [friendName, setFriendName] = useState("");
  const [error, setError] = useState("");

  const handleAddFriend = async () => {
    if (!friendName.trim()) return;
    try {
      await addFriend(friendName);
      setFriendName("");
    } catch (error: any) {
      setError(error.message);
    }
  };

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
          <span className="text-white/70 font-light text-lg uppercase tracking-[0.2em] font-mono">{user.elo}</span>
        </PrimaryContainer>

        <PrimaryContainer className="rounded-lg flex items-center justify-between h-7">
          <div className="flex items-center space-x-3">
            <Coins className="text-amber-300" size={20} />
            <span className="text-white/70 font-light text-lg uppercase tracking-[0.2em]">Coins</span>
          </div>
          <span className="text-white/70 font-light text-lg uppercase tracking-[0.2em] font-mono">{user.coins}</span>
        </PrimaryContainer>
        <PrimaryContainer className="rounded-lg flex flex-col h-40 items-start justify-start py-2 overflow-y-auto">
          <div className="flex items-center justify-center space-x-3">
            <Contact className="text-amber-300" size={20} />
            <span className="text-white/70 font-light text-lg uppercase tracking-[0.2em]">Friends</span>
          </div>
          <div className="relative flex items-center w-full max-w-sm">
            <div className="relative flex items-center w-full mb-3">
              <input
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddFriend()}
                placeholder="Add new friend"
                className="w-full bg-white/10 p-2 pr-10 rounded-md text-sm outline-none placeholder-white/40 focus:ring-1 focus:ring-amber-300/50 transition-all"
              />
              <button
                className="absolute right-2 text-amber-300 hover:text-amber-100 transition-colors"
                onClick={handleAddFriend}
              >
                <PlusIcon size={20} />
              </button>
            </div>
          </div>
          <div className="w-full space-y-1 overflow-y-auto custom-scrollbar flex-grow">
            {user.friends.length > 0 ? (
              user.friends.map((friend) => (
                <FriendButton key={friend}>
                  {friend}
                </FriendButton>
              ))
            ) : (
              <span className="text-white/30 text-xs italic px-2">No friends yet...</span>
            )}
          </div>
        </PrimaryContainer>
      </div>

      <div className="flex-grow" />

      <PrimaryButton
        onClick={onLogout} className="flex w-fit">
        <LogOut size={25} className="text-white" />
      </PrimaryButton>

      <FeedbackModal
        isLoading={loading}
        isOpen={loading || !!error}
        type={error.includes("Too many requests") ? "timedOut" : "error"}
        message={error}
        onClose={() => setError("")}
      />

    </div>

  );
}