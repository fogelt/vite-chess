import { useLocation } from "react-router-dom";
import { useAuth } from "@/services";
import { LoginForm } from "./login-form/login-form";
import { UserDashboard } from "./user-dashboard/user-dashboard";

export function SideMenu() {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  if (location.pathname === "/register") {
    return null;
  }

  return (
    <div className={`hidden lg:flex flex-col absolute inset-left bg-gray-600/30 h-full w-[20%] 
      rounded-r-sm ring-2 ring-white/50 backdrop-blur-sm p-5 shadow-2xl
      animate-in fade-in duration-700 slide-in-from-left-24 delay-700 fill-mode-backwards`}>

      {isAuthenticated ? (
        <UserDashboard user={user} onLogout={logout} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}