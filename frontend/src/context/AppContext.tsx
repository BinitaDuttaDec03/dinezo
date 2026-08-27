import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { IAppContextType, ILocationData, IUser } from "../types";

const AppContext = createContext<IAppContextType | undefined>(undefined);

interface IAppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: IAppProviderProps) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const [location, setLocation] = useState<ILocationData | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [city, setCity] = useState("Fecthing Location...");

    async function fetchUser() {
        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.get(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(data);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
            setIsAuth(false)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AppContext.Provider
            value={{
                isAuth,
                loading,
                setIsAuth,
                setLoading,
                setUser,
                user,
                location,
                loadingLocation,
                city,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppData = (): IAppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppData must be used within AppProvider");
    }
    return context;
};
