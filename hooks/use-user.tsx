import { IUser } from "@/types";
import { create } from "zustand";
import { getCookie, setCookie } from "cookies-next";

interface UserStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}

export const useUser = create<UserStore>((set) => ({
  isLoggedIn: getCookie("accessToken") ? true : false,
  user: getCookie("user")
    ? (JSON.parse(getCookie("user") as string) as IUser)
    : null,
  setIsLoggedIn: (isLoggedIn: boolean) =>
    set(() => ({ isLoggedIn: isLoggedIn })),
  setUser: (user: IUser) => {
    set(() => ({ user: user }));
    setCookie("user", user);
  },
  accessToken: getCookie("accessToken") as string | null,
  setAccessToken: (accessToken: string) => {
    set(() => ({ accessToken: accessToken }));
    setCookie("accessToken", accessToken);
  },
  logout: () => {
    set(() => ({ isLoggedIn: false, user: null, accessToken: null }));
    setCookie("accessToken", "");
    setCookie("user", "");
  },
}));
