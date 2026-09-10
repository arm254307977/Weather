import axios from "axios";

export const searchCountry = async (name: string) => {
    try {
        return await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
            params: { name, count: 5, language: "th" },
        });
    } catch (error) {
        console.error("Error in api:", error);
        return error;
    }
};
