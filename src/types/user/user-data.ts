export type UserData = {
  id: string;
  token: string;
  username: string;
  elo: number;
  coins: number;
  friends: string[];
  message: string;
}

export const DEFAULT_GUEST: UserData = {
  id: "",
  token: "",
  username: "Guest",
  elo: 0,
  coins: 0,
  friends: [],
  message: "Browsing as guest",
};