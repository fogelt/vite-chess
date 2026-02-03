import { useLocation } from "react-router-dom";
import { LoginForm } from "@/components/ui";

export function SideMenu() {
  const location = useLocation();

  if (location.pathname === "/register") {
    return null;
  }

  return (
    <div className={`absolute inset-left bg-gray-600/30 h-full w-[20%] rounded-r-sm
      ring-2 ring-white/50 backdrop-blur-sm p-5 shadow-2xl
      animate-in fade-in duration-700 slide-in-from-left-24 delay-700 fill-mode-backwards`}>
      <LoginForm />
    </div>
  );
}