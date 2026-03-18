import type { ReactNode } from "react";
import type React from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
}

export interface ILocationData {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

export interface IAppContextType {
  user: IUser | null;
  loading: boolean;
  isAuth: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAppProviderProps {
  children: ReactNode;
}
