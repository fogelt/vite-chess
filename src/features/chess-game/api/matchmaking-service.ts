const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useMatchmaking() {
  const findOrCreateMatch = async (userId: string, botGame: boolean = false) => {
    try {
      const response = await fetch(`${BASE_URL}/api/game/find-or-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, botGame })
      });

      if (!response.ok) throw new Error("Matchmaking failed");
      return await response.json();
    } catch (error) {
      console.error("Matchmaking error:", error);
      throw error;
    }
  };

  return { findOrCreateMatch };
}