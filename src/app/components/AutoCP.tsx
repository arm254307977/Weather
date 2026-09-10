"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";
import { SearchIcon } from "./SearchIcon";

// type
import * as typeValue from "@/app/type/type";

// Function
import * as functionHomPage from "@/app/function/functionHomePage";

type Props = {
  setDataState: React.Dispatch<React.SetStateAction<typeValue.DataWeatherState>>;
  dataState: typeValue.DataWeatherState;
};

const InputCityAutocomplete = ({ setDataState, dataState }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [optionCountry, setOptionCountry] = useState<typeValue.OptionCountryState[]>(
    typeValue.initialOptionCountryState
  );

  const selectCity = (selectedCity: typeValue.OptionCountryState) => {
    const nextState = { ...dataState, city: `${selectedCity.lat},${selectedCity.lon}` };
    setInputValue(selectedCity.name);
    setDataState(nextState);
    functionHomPage.getDataForecast(nextState, setDataState);
  };

  const searchFirstMatch = async () => {
    const [selectedCity] = await functionHomPage.getCountryOptions(inputValue);
    if (selectedCity) selectCity(selectedCity);
  };

  return (
    <div className="flex items-center w-full">
      <Autocomplete
        classNames={{
          base: "w-full",
          popoverContent: "bg-[#162335] border border-[#26374E] shadow-lg",
        }}
        inputProps={{
          classNames: {
            inputWrapper:
              "bg-[#162335] border border-[#26374E] data-[hover=true]:bg-[#17253A] group-data-[focus=true]:border-[#5AD1C8] min-h-[46px]",
            input: "ml-1 text-[14px] text-white placeholder:text-[#7D93B2]",
          },
        }}
        value={inputValue}
        onInputChange={(value) =>
          functionHomPage.InputCountry(value, setInputValue, setDataState, setOptionCountry)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            searchFirstMatch();
          }
        }}
        onSelectionChange={(key) => {
          const selectedCity = optionCountry.find((item) => item.id === Number(key));
          if (!selectedCity) return;

          selectCity(selectedCity);
        }}
        defaultItems={optionCountry}
        disableAnimation
        allowsCustomValue={true}
        aria-label="ค้นหาเมือง"
        placeholder="ค้นหาเมือง หรือ จังหวัด"
        startContent={
          <div
            className="cursor-pointer"
            onClick={searchFirstMatch}
          >
            <SearchIcon className="text-[#7D93B2]" strokeWidth={2.4} size={18} />
          </div>
        }
        radius="full"
        variant="bordered"
      >
        {(item) => (
          <AutocompleteItem
            key={item.id}
            textValue={item.name}
            className="text-[#E8EEF7] data-[hover=true]:bg-[#17253A]"
          >
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-[#7D93B2]">{item.country}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default InputCityAutocomplete;
