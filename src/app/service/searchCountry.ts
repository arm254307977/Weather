import * as URL from "@/app/constant/http";
import { API } from "@/app/constant/api";
import { configGet } from "@/app/constant/network";
import axios from "axios";

export const searchCountry = async (params: string) => {
    try {
        const response = await axios(
            configGet(`${URL.baseURL}/${API.SEARCHCOUNTRY}?${params}`)
        );

        return response;
    } catch (error) {
        console.error("Error in api:", error);
        return error;
    }
};