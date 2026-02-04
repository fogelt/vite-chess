const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useMatchmaking() {
  const findOrCreateMatch = async () => {
    try {
      const findRes = await fetch(`${BASE_URL}/api/game/find-match`);

      if (findRes.ok) {
        const data = await findRes.json();
        return data;
      }

      const createRes = await fetch(`${BASE_URL}/api/game/start-game`, {
        method: "POST"
      });

      if (!createRes.ok) throw new Error("Matchmaking failed");

      return await createRes.json();
    } catch (error) {
      console.error("Matchmaking error:", error);
      throw error;
    }
  };

  return { findOrCreateMatch };
}