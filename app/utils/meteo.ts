const WEATHER_API_KEY = "6bf253af5bd09e64a1abeb82906d5912";
export const fetchWeather = async (city: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEATHER_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric&lang=ar`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error(`Response Status:${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erreur de recherche des données météorologiques!: ", error);
    return null;
  }
};
