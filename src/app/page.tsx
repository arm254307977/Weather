"use client";
import { useEffect, useMemo, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";

// type
import { DataWeatherState, initialDataWeatherState } from "./type/type";

// Function
import * as functionForecast from "@/app/function/functionHomePage";
import { aqiFromPm25 } from "@/app/function/aqi";
import { DEFAULT_SAVED_CITIES, NAV_ITEMS, ViewKey } from "@/app/constant/nav";

// Component
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import TopBar from "./components/TopBar";
import AlertBanner from "./components/AlertBanner";
import Current from "./components/Current";
import MetricGrid from "./components/MetricGrid";
import HourlyChart from "./components/HourlyChart";
import HourlyList from "./components/HourlyList";
import WeekForecast from "./components/WeekForecast";
import WeatherDetail from "./components/AirQuality";
import SavedCities from "./components/SavedCities";
import LoadingPage from "./components/LoadingPage";
import ErrorApiPage from "./components/ErrorApiPage";

type SavedCity = { name: string; temp: number | null; condition?: string; aqi?: number | null };

const SAVED_KEY = "weather-app:saved-cities";

const readSavedCities = (): SavedCity[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedCity[]) : [];
  } catch {
    return [];
  }
};

export default function Home() {
  const [dataState, setDataState] = useState<DataWeatherState>(initialDataWeatherState);
  const [view, setView] = useState<ViewKey>("home");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [savedCities, setSavedCities] = useState<SavedCity[]>(
    DEFAULT_SAVED_CITIES.map((name) => ({ name, temp: null }))
  );

  useEffect(() => {
    functionForecast.getDataForecast(dataState, setDataState);
    const stored = readSavedCities();
    if (stored.length > 0) setSavedCities(stored);
  }, []);

  const weather = dataState.data && dataState.data !== "api error" ? dataState.data : null;
  const isError = dataState.data === "api error";
  const alerts: any[] = weather?.alerts?.alert || [];

  // เก็บเมืองที่เพิ่งดูไว้ในรายการเมืองที่บันทึกไว้
  useEffect(() => {
    if (!weather?.current) return;
    const name = weather.location.name;
    const entry: SavedCity = {
      name,
      temp: weather.current.temp_c,
      condition: weather.current.condition.text,
      aqi: weather.current.air_quality ? aqiFromPm25(weather.current.air_quality.pm2_5) : null,
    };
    setSavedCities((prev) => {
      const rest = prev.filter((c) => c.name !== name);
      const next = [entry, ...rest].slice(0, 6);
      try {
        window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch {
        // ไม่รองรับ localStorage — ใช้ค่าใน state ต่อไป
      }
      return next;
    });
  }, [weather?.location?.name, weather?.current?.temp_c]);

  const loadCity = (city: string) => {
    const next = { ...dataState, city };
    setDataState(next);
    functionForecast.getDataForecast(next, setDataState);
    setView("home");
  };

  const updatedAt = useMemo(() => {
    const localtime = weather?.location?.localtime;
    return localtime ? localtime.split(" ")[1] : "";
  }, [weather?.location?.localtime]);

  const viewTitle = NAV_ITEMS.find((n) => n.key === view)?.label || "";

  return (
    <NextUIProvider>
      <div className="min-h-screen flex bg-[#0B1220] text-[#E8EEF7]">
        <Sidebar
          view={view}
          setView={setView}
          savedCities={savedCities}
          onSelectCity={loadCity}
          alertCount={alerts.length}
          updatedAt={updatedAt}
        />

        <main className="flex-1 min-w-0 flex flex-col">
          <TopBar
            dataState={dataState}
            setDataState={setDataState}
            unit={unit}
            setUnit={setUnit}
          />

          <div className="flex-1 px-5 md:px-8 py-6 pb-[88px] md:pb-8 flex flex-col gap-5">
            {view !== "home" && (
              <h1 className="text-[22px] md:text-[24px] font-semibold">{viewTitle}</h1>
            )}

            {dataState.isLoading ? (
              <LoadingPage />
            ) : isError ? (
              <ErrorApiPage
                onRetry={() => functionForecast.getDataForecast(dataState, setDataState)}
              />
            ) : !weather?.current ? null : (
              <>
                {view === "home" && (
                  <>
                    {alerts.length > 0 && (
                      <AlertBanner alerts={alerts} onOpen={() => setView("alerts")} />
                    )}
                    <div className="grid grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)] gap-5">
                      <Current data={dataState} unit={unit} />
                      <MetricGrid data={weather} unit={unit} />
                    </div>
                    <HourlyChart data={weather} unit={unit} />
                    <WeekForecast data={weather} unit={unit} />
                  </>
                )}

                {view === "hourly" && (
                  <>
                    <HourlyChart data={weather} unit={unit} />
                    <HourlyList data={weather} unit={unit} />
                  </>
                )}

                {view === "air" && <WeatherDetail data={weather} />}

                {view === "saved" && (
                  <SavedCities
                    cities={savedCities}
                    onSelectCity={loadCity}
                    activeCity={weather.location.name}
                  />
                )}

                {view === "alerts" && (
                  alerts.length > 0 ? (
                    <AlertBanner alerts={alerts} compact={false} />
                  ) : (
                    <div className="bg-[#141F31] border border-[#24334A] rounded-xl p-6 text-[14px] text-[#8AA0BE]">
                      ไม่มีประกาศเตือนภัยในพื้นที่นี้
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </main>

        <MobileNav view={view} setView={setView} alertCount={alerts.length} />
      </div>
    </NextUIProvider>
  );
}
