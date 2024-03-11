import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { SearchIcon } from "./SearchIcon";
import * as functionHomPage from "@/app/function/functionHomePage";
import * as typeValue from "@/app/type/type";

type Props = {
  setDataState: React.Dispatch<
    React.SetStateAction<typeValue.DataWeatherState>
  >;
  dataState: typeValue.DataWeatherState;
};

const InputCityAutocomplete = ({ setDataState, dataState }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [optionCountry, setOptionCountry] = useState<
    typeValue.OptionCountryState[]
  >(typeValue.initialOptionCountryState);

  return (
    <div className="flex items-center w-full md:w-2/4 order-2 md:order-1">
      <Autocomplete
        inputProps={{
          classNames: {
            input: "ml-1",
          },
          style: {
            color: "white",
          },
        }}
        color="primary"
        value={inputValue}
        onInputChange={(value) =>
          functionHomPage.InputCountry(
            value,
            setInputValue,
            setDataState,
            setOptionCountry
          )
        }
        onKeyDown={(e) =>
          functionHomPage.handleSelectOptionCountry(e, dataState, setDataState)
        }
        defaultItems={optionCountry}
        allowsCustomValue={true}
        aria-label="Select an country"
        placeholder="Enter country"
        startContent={
          <div
            onClick={() =>
              functionHomPage.getDataForecast(dataState, setDataState)
            }
          >
            <SearchIcon
              className=" text-white/70 cursor-pointer"
              strokeWidth={2.5}
              size={20}
            />
          </div>
        }
        radius="full"
        variant="bordered"
      >
        {(item) => (
          <AutocompleteItem key={item.id} textValue={item.name}>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{item.name}</span>
                  <span className="text-tiny text-default-400">
                    {item.country}
                  </span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default InputCityAutocomplete;
