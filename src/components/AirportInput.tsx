/* Component that renders each input with US airports autocomplete */
/* handleSelect function set the state passed as props with the selected airport location */
/* handleClear function clears the input value */

import { AirportInputProps } from "types/props";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";

import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton } from "@mui/material";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover
} from "@reach/combobox";

const AirportInput = ({ setAirport }: AirportInputProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["airport"],
      componentRestrictions: {
        country: "us",
      },
    },
  });

  const handleSelect = async (value: string): Promise<void> => {
    setValue(value, false);
    clearSuggestions();

    const results = await getGeocode({ address: value });
    const { lat, lng } = getLatLng(results[0]);
    setAirport({ lat, lng });
  };

  return (
    <>
      {ready && (
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            className="w-[100%] p-[0.5rem] shadow-lg border-2 border-gray-100 rounded-md"
            value={value}
            onChange={({ target }) => setValue(target.value)}
            placeholder="Search airports"
          />

          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption
                    className="hover:bg-slate-200"
                    key={place_id}
                    value={description}
                  />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      )}
    </>
  );
};

export default AirportInput;
