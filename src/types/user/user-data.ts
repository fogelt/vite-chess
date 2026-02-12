export type UserData = {
  id: string;
  token: string;
  username: string;
  eloRating: number;
  coins: number;
  friends: string[];
  message: string;
}

export const DEFAULT_GUEST: UserData = {
  id: "",
  token: "",
  username: "Guest",
  eloRating: 0,
  coins: 0,
  friends: [],
  message: "Browsing as guest",
};