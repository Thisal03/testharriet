import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import locations from "@/lib/locations.json";

interface GeoapifyAutocompleteInputProps {
  value: string;
  onSelect: (result: {
    address: string;
    city?: string;
    state?: string;
    zipCode?: string;
  }) => void;
  placeholder?: string;
}

export const GeoapifyAutocompleteInput: React.FC<GeoapifyAutocompleteInputProps> = ({
  value,
  onSelect,
  placeholder = "Address",
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState(value || "");
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Collapse suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchSuggestions = async (text: string) => {
    if (!apiKey || !text) return;
    setLoading(true);
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      text
    )}&type=amenity&filter=countrycode:lk&lang=en&limit=8&format=json&apiKey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    setSuggestions(data.results || []);
    setLoading(false);
  };

  // Helper to capitalize first letter of each word
  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Auto-capitalize first letter of each word
    const val = capitalizeWords(e.target.value);
    setInputValue(val);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 350);
  };

  const handleSelect = (suggestion: any) => {
    setInputValue(suggestion.formatted);
    setSuggestions([]);
    // Try to get city from multiple possible fields
    let city =
      suggestion.city ||
      suggestion.locality ||
      suggestion.town ||
      suggestion.village ||
      "";

    // If city is still empty, try to extract from formatted address
    if (!city && suggestion.formatted) {
      const parts = suggestion.formatted.split(',');
      if (parts.length >= 2) {
        city = parts[parts.length - 2].replace(/\d+/, '').trim();
      }
    }
    onSelect({
      address: suggestion.formatted,
      city,
      state: suggestion.state,
      zipCode: suggestion.postcode,
    });
  };

  return (
    <div style={{ position: "relative" }} ref={wrapperRef}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        onBlur={() => {
          // Update form with manually typed address when user finishes typing
          if (inputValue && inputValue.trim() !== "") {
            onSelect({
              address: inputValue,
              city: undefined,
              state: undefined,
              zipCode: undefined,
            });
          }
        }}
      />
      {loading && <div className="absolute left-0 mt-1 text-xs text-gray-500">Loading...</div>}
      {suggestions.length > 0 && (
        <ul
          className="absolute left-0 z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg max-h-56 overflow-y-auto p-0"
        >
          {suggestions.map((s, i) => (
            <li
              key={`${s.place_id}-${i}`}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
              onClick={() => handleSelect(s)}
            >
              {s.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 