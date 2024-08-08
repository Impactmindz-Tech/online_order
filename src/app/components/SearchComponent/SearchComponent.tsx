"use client";
import React, { useState, useEffect, useRef } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import { getFromLocalStorage, removeFromLocalStorage, setInLocalStorage } from "@/app/utills/LocalStorageUtills";

interface SearchComponentProps {
  selectPosition: any;
  setSelectPosition: React.Dispatch<React.SetStateAction<any>>;
  places: PlaceLocation[];
}
interface PlaceLocation {
  city: string;
  country: string;
  near_by: string;
  pincode: number;
  placename: string;
  state: string;
  town: string;
  id: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ selectPosition, setSelectPosition, places }) => {
  const savedPlace = getFromLocalStorage("place");
  const initialSearchText = savedPlace ? JSON.parse(savedPlace).placename : "";

  const [searchText, setSearchText] = useState<string>(initialSearchText);
  const [listPlace, setListPlace] = useState<PlaceLocation[]>([]);
  const { t } = useTranslation();
  const [lang, setLang] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    // Clear suggestions on initial render
    setListPlace([]);
  }, []);

  useEffect(() => {
    const filterPlaces = () => {
      if (!searchText) {
        setListPlace([]);
        return;
      }

      const filteredPlaces = places?.filter((place) => place.placename?.toLowerCase().includes(searchText.toLowerCase())) || [];
      setListPlace(filteredPlaces);
    };

    filterPlaces();
  }, [searchText, places]);

  useEffect(() => {
    setLang(getFromLocalStorage("lang") === "he");
  }, []);

  useEffect(() => {
    const username = getFromLocalStorage("username");
    if (username) {
      removeFromLocalStorage("place"); // Remove place if username exists in localStorage
      setSearchText(""); // Clear the search text
      setSelectPosition(null); // Clear the selected position
    } else if (savedPlace) {
      setSelectPosition(JSON.parse(savedPlace));
    }
  }, [savedPlace, setSelectPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) && listRef.current && !listRef.current.contains(event.target as Node) && !isSelecting) {
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
      <OutlinedInput value={searchText} placeholder={t("AutoComplete")} className={`w-[96%] m-auto ${lang ? "rtl" : ""}`} onChange={(e) => setSearchText(e.target.value)} ref={inputRef} />
      {searchText && listPlace.length > 0 && (
        <List ref={listRef}>
          {listPlace.map((item) => (
            <ListItem
              button
              key={item.id}
              onMouseDown={() => setIsSelecting(true)}
              onMouseUp={() => {
                setIsSelecting(false);
                setSelectPosition(item);
                setSearchText(item.placename); // Set the input field with the selected item's display name
                setListPlace([]); // Clear suggestions after selection
                setInLocalStorage("place", JSON.stringify(item)); // Store the selected place in localStorage
                removeFromLocalStorage("username");
              }}
            >
              <ListItemButton>
                <ListItemText primary={item.placename} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default SearchComponent;
