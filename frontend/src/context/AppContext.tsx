import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { Toaster } from "react-hot-toast";
import type { IAppContextType, ILocationData, IUser } from "../types";

const AppContext = createContext<IAppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
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

    useEffect(() => {
        if (!navigator.geolocation)
            return alert("Please Allow Location to continue");

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await res.json();

                setLocation({
                    latitude,
                    longitude,
                    formattedAddress: data.display_name || "current location",
                });

                setCity(
                    data.address.city ||
                    data.address.town ||
                    data.address.village ||
                    "Your Location"
                );
                setLoadingLocation(false);
            } catch (error) {
                setLocation({
                    latitude,
                    longitude,
                    formattedAddress: "Current Location",
                });
                setCity("Failed to load");
                setLoadingLocation(false);
            }
        });
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

            <Toaster />
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
