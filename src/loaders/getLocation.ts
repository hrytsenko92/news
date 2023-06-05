export interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}

export const getLocation = async (
  timeout = 5000
): Promise<{ latitude: number; longitude: number } | null> => {
  if ("geolocation" in navigator) {
    try {
      const position = await new Promise<Position>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout });
      });
      const { latitude, longitude } = position.coords;
      return { latitude, longitude };
    } catch (error) {
      console.error("getLocation error:", error);
      return null;
    }
  } else {
    console.error("Geolocation is not supported in this browser");
    return null;
  }
};
