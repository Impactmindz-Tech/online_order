"use client";
import React, { useState, useEffect, useRef } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage, removeFromLocalStorage, setInLocalStorage } from "@/app/utills/LocalStorageUtills";

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
  const savedPlace = getFromLocalStorage("place");
  const initialSearchText = savedPlace ? JSON.parse(savedPlace).display_name : "";

  const [searchText, setSearchText] = useState<string>(initialSearchText);
  const [listPlace, setListPlace] = useState<Place[]>([]);
  const { t } = useTranslation();
  const [lang, setLang] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [isSelecting, setIsSelecting] = useState(false);

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

  useEffect(() => {
    if (getFromLocalStorage("lang") === "he") {
      setLang(true);
    } else {
      setLang(false);
    }
  }, [getFromLocalStorage("lang")]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) && 
        listRef.current && 
        !listRef.current.contains(event.target as Node) &&
        !isSelecting
      ) {
        setListPlace([]); // Clear suggestions if click is outside the input
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, listRef, isSelecting]);

  return (
    <>
      <OutlinedInput
        value={searchText}
        placeholder={t("AutoComplete")}
        className={`w-[96%] m-auto ${lang ? "rtl" : ""}`}
        onChange={(e) => setSearchText(e.target.value)}
        ref={inputRef}
      />
      <List ref={listRef}>
        {listPlace.map((item) => (
          <ListItem
            button
            key={item.place_id}
            onMouseDown={() => setIsSelecting(true)}
            onMouseUp={() => {
              setIsSelecting(false);
              setSelectPosition(item);
              setSearchText(item.display_name); // Set the input field with the selected item's display name
              setListPlace([]); // Clear suggestions after selection
              setInLocalStorage("place", JSON.stringify(item)); // Store the selected place in localStorage
              removeFromLocalStorage("username")
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
