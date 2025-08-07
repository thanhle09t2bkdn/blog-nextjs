import { IUser } from '@/types';
import { create } from 'zustand';
import { getCookie, setCookie } from 'cookies-next';

interface UserStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
  _hydrated: boolean;
  _setHydrated: () => void;
}

export const useUser = create<UserStore>((set, get) => ({
  // Initialize with safe defaults for SSR
  isLoggedIn: false,
  user: null,
  accessToken: null,
  _hydrated: false,
  _setHydrated: () => set({ _hydrated: true }),
  setIsLoggedIn: (isLoggedIn: boolean) =>
    set(() => ({ isLoggedIn: isLoggedIn })),
  setUser: async (user: IUser) => {
    set(() => ({ user: user }));
    if (typeof window !== 'undefined') {
      await setCookie('user', JSON.stringify(user));
    }
  },
  setAccessToken: async (accessToken: string) => {
    set(() => ({ accessToken: accessToken }));
    if (typeof window !== 'undefined') {
      await setCookie('accessToken', accessToken);
    }
  },
  logout: async () => {
    set(() => ({ isLoggedIn: false, user: null, accessToken: null }));
    if (typeof window !== 'undefined') {
      await setCookie('accessToken', '');
      await setCookie('user', '');
    }
  },
}));

// Hydration function to be called on client side
export const hydrateUserStore = () => {
  if (typeof window === 'undefined') return;

  const accessToken = getCookie('accessToken') as string | null;
  const userCookie = getCookie('user') as string | null;

  useUser.setState({
    isLoggedIn: !!accessToken,
    user: userCookie ? (JSON.parse(userCookie) as IUser) : null,
    accessToken,
    _hydrated: true,
  });
};
