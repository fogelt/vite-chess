import { useLocation } from "react-router-dom";
import { useAuth } from "@/services";
import { LoginForm, UserDashboard } from "@/components/ui";

export function SideMenu() {
  const location = useLocation();
  const { isAuthenticated, getUserId, logout } = useAuth();

  if (location.pathname === "/register") {
    return null;
  }

  const username = localStorage.getItem("username") || "Guest";

  const userStats = {
    username: username,
    eloRating: Number(localStorage.getItem("elo")),
    coins: Number(localStorage.getItem("coins"))
  };

  return (
    <div className={`absolute inset-left bg-gray-600/30 h-full w-[20%] rounded-r-sm
      ring-2 ring-white/50 backdrop-blur-sm p-5 shadow-2xl
      animate-in fade-in duration-700 slide-in-from-left-24 delay-700 fill-mode-backwards`}>

      {isAuthenticated ? (
        <UserDashboard user={userStats} onLogout={logout} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}