import { useState } from "react";
import { LoginRequest, RegisterRequest } from "@/types";
import { useNavigate } from "react-router-dom";
import { UserData, DEFAULT_GUEST } from "@/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getUserId = () => {
    const stored = localStorage.getItem("user_profile");
    if (stored) {
      return JSON.parse(stored).username;
    }

    let id = localStorage.getItem('chess_user_id');
    if (!id) {
      id = `guest_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('chess_user_id', id);
    }
    return id;
  };

  const getUser = (): UserData => {
    const stored = localStorage.getItem("user_profile");

    if (stored) {
      return JSON.parse(stored);
    }
    return {
      ...DEFAULT_GUEST,
      username: getUserId()
    };
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
      console.log(data)
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

  const addFriend = async (friendUsername: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/api/user/add-friend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ friendUsername }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add friend");
      }

      const currentProfile = getUser();
      const updatedProfile = {
        ...currentProfile,
        friends: [...currentProfile.friends, friendUsername]
      };

      localStorage.setItem("user_profile", JSON.stringify(updatedProfile));

      return updatedProfile;
    } catch (error) {
      console.error("Add friend error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };


  return {
    login,
    register,
    logout, addFriend,
    getUserId, user: getUser(),
    loading,
    isAuthenticated: !!localStorage.getItem("token")
  };
}