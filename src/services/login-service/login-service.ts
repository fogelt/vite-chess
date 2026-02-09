import { useState } from "react";
import { LoginRequest, RegisterRequest } from "@/types";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserId = () => {
    const username = localStorage.getItem("username");
    if (username) return username;

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

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      console.log(data)
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("elo", data.elo.toString());
      localStorage.setItem("coins", data.coins.toString());

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
    getUserId,
    loading,
    isAuthenticated: !!localStorage.getItem("token")
  };
}