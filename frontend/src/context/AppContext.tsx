import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "../main";
import {
  type IUser,
  type IAppContextType,
  type IAppProviderProps,
} from "../types";

const AppContext = createContext<IAppContextType | undefined>(undefined);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState("Fetching location...");

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${authService}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{ loading, setLoading, user, setUser, isAuth, setIsAuth }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = (): IAppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppData must be used with AppProvider");
  }

  return context;
};
