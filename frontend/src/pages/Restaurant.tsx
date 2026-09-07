import { useEffect, useState } from "react";
import axios from "axios";

import type { IRestaurant } from "../types";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMyRestaurant = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_RESTAURANT_SERVICE_URL}/api/restaurant/my`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRestaurant(data.restaurant || null);

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRestaurant();
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading your restaurant...</p>
      </div>
    );

  return (
    <div>Restaurant</div>
  );
};

export default Restaurant;
