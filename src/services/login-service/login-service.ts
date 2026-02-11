import { useState } from "react";
import { LoginRequest, RegisterRequest } from "@/types";
import { useNavigate } from "react-router-dom";
import { UserData, DEFAULT_GUEST } from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUser = (): UserData => {
    const stored = localStorage.getItem("user_profile");
    return stored ? JSON.parse(stored) : DEFAULT_GUEST;
  };

  const getUserId = () => {
    const user = getUser();
    if (user) return user.username;

    let id = localStorage.getItem('chess_user_id');
    if (!id) {
      id = `guest_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('chess_user_id', id);
    }
    return id;
  };

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data: UserData = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      const { message, ...userProfile } = data;
      localStorage.setItem("user_profile", JSON.stringify(userProfile));

      localStorage.setItem("token", data.token);

      localStorage.removeItem('chess_user_id');

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  const register = async (userData: RegisterRequest) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };


  return {
    login,
    register,
    logout,
    getUserId, user: getUser(),
    loading,
    isAuthenticated: !!localStorage.getItem("token")
  };
}