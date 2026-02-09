import { GripVertical } from "lucide-react";

interface FriendButtonProps {
  children?: string;

}

export function FriendButton({ children }: FriendButtonProps) {
  return (
    <div className="pl-3 pt-2 flex space-x-1 items-center font-light text-md uppercase tracking-[0.1em]">
      <button>
        <GripVertical size={16} className="mt-[1px]" />
      </button>
      <span className="">Karl-Johan</span>
    </div>
  );
}