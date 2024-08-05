"use client"
import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

interface SearchComponentProps {
  selectPosition: any;
  setSelectPosition: React.Dispatch<React.SetStateAction<any>>;
}

interface Place {
  place_id: string;
  lat: string;
  lon: string;
  display_name: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ selectPosition, setSelectPosition }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [listPlace, setListPlace] = useState<Place[]>([]);
  const { t } = useTranslation();

  const fetchPlaces = async (query: string) => {
    if (!query) {
      setListPlace([]);
      return;
    }

    const params = {
      q: query,
      format: "json",
      addressdetails: "1",
      polygon_geojson: "0",
    };
    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`${NOMINATIM_BASE_URL}${queryString}`);
      const places: Place[] = await response.json();
      setListPlace(places);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedFetchPlaces = debounce(fetchPlaces, 300);

  useEffect(() => {
    debouncedFetchPlaces(searchText);
  }, [searchText]);

  return (
    <>
      <OutlinedInput
        value={searchText}
        placeholder={t("AutoComplete")}
      className="w-[90%] m-auto"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <List>
        {listPlace.map((item) => (
          <ListItem
            button
            key={item.place_id}
            onClick={() => {
       
              setSelectPosition(item);
              setSearchText(item.display_name); // Set the input field with the selected item's display name
              setListPlace([]); // Clear suggestions after selection
            }}
          >
            <ListItemButton>
              <ListItemText primary={item.display_name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchComponent;
