import sky from "@/app/assets/images/sky.jpg"

export interface DataWeatherState {
  city: string;
  days: string;
  isAirQuality: string;
  IsWeatherAlerts: string;
  isLoading: boolean;
  data: any;
  imageBG: string
};

export const initialDataWeatherState: DataWeatherState = {
  city: "Bangkok",
  days: "7",
  isAirQuality: "yes",
  IsWeatherAlerts: "yes",
  isLoading: false,
  data: {},
  imageBG: sky.src
};

export interface OptionCountryState {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export const initialOptionCountryState: OptionCountryState[] = [
  {
    id: 2801268,
    name: "London",
    region: "City of London, Greater London",
    country: "United Kingdom",
    lat: 51.52,
    lon: -0.11,
    url: "london-city-of-london-greater-london-united-kingdom",
  },
  {
    "id": 2393227,
    "name": "Chiang Mai",
    "region": "Chiang Mai",
    "country": "Thailand",
    "lat": 18.79,
    "lon": 98.98,
    "url": "chiang-mai-chiang-mai-thailand"
  },
  {
    "id": 918425,
    "name": "Hong Kong",
    "region": "",
    "country": "Hong Kong",
    "lat": 22.28,
    "lon": 114.15,
    "url": "hong-kong-hong-kong"
  },
  {
    "id": 9009759,
    "name": "Chicago Fss",
    "region": "Chicago",
    "country": "United States of America",
    "lat": 41.88,
    "lon": -87.77,
    "url": "chicago-fss-chicago-united-states-of-america"
  }
];  