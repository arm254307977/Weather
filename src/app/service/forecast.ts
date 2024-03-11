import * as URL from "@/app/constant/http";
import { API } from "@/app/constant/api";
import { configGet } from "@/app/constant/network";
import axios from "axios";
import * as alert from "@/app/service/alert";

export const getDataForecast = async (params: string) => {
    try {
        const response = await axios(
            configGet(`${URL.baseURL}/${API.FORECAST}?${params}`)
        );

        return response;
    } catch (error) {
        alert.warningNoRespond("API crashed.");
        console.error("Error in api:", error);
        return error;
    }
};