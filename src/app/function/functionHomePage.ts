import * as typeValue from "@/app/type/type";
import { Dispatch } from "react";
import * as serviceForecast from "@/app/service/forecast";
import * as serviceSearchCountry from "@/app/service/searchCountry";
import * as alert from "@/app/service/alert";

export const getDataForecast = async (
    dataState: typeValue.DataWeatherState,
    setDataState: Dispatch<React.SetStateAction<typeValue.DataWeatherState>>
) => {
    setDataState((old: typeValue.DataWeatherState) => ({ ...old, isLoading: true }));
    const queryString = `key=${process.env.NEXT_PUBLIC_API_KEY}&q=${dataState.city}&days=${dataState.days}&aqi=${dataState.isAirQuality}&alerts=${dataState.IsWeatherAlerts}`;
    const response: any = await serviceForecast.getDataForecast(queryString);

    if (response.status === 200) {
        dataState.data = response.data;
        setDataState((old: typeValue.DataWeatherState) => ({
            ...old,
            isLoading: false,
            data: dataState.data,
            city: "",
        }));
        await alert.successNoRespond("Data loaded successfully.");
    } else {
        setDataState((old: typeValue.DataWeatherState) => ({
            ...old,
            isLoading: false,
            data: "api error",
        }));
        await alert.warningNoRespond("Failed to load weather information.");
    }
};

export const InputCountry = async (
    value: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setDataState: React.Dispatch<React.SetStateAction<typeValue.DataWeatherState>>,
    setOptionCountry: React.Dispatch<React.SetStateAction<typeValue.OptionCountryState[]>>,
) => {
    setInputValue(value);
    setDataState((prev: any) => ({
        ...prev,
        city: value,
    }));
    if (value === "") return;
    const queryString = `key=${process.env.NEXT_PUBLIC_API_KEY}&q=${value}`;
    try {
        const response: any = await serviceSearchCountry.searchCountry(queryString);
        if (response.status === 200) {
            if (response.data.length !== 0) {
                const data = await response.data;
                setOptionCountry(data);
                return;
            }

        } else {
            return;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

};

export const handleSelectOptionCountry = (
    e: React.KeyboardEvent<HTMLInputElement>,
    dataState: typeValue.DataWeatherState,
    setDataState: React.Dispatch<React.SetStateAction<typeValue.DataWeatherState>>
) => {

    if (e.code === "Enter" || e.code === "NumpadEnter") {
        getDataForecast(dataState, setDataState);
    }
};