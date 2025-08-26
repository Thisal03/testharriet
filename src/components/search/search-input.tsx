"use client";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { useClickAway, useDebounce } from "react-use";
import { SearchResults } from "./search-results";
import { ScrollArea } from "../ui/scroll-area";
import { Search, X } from "lucide-react";
import { useMobileKeyboard } from "@/hooks/use-mobile-keyboard";

const SearchInput = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const ref = useRef(null);
  const { scrollContainerRef, setScrollContainerRef } = useMobileKeyboard();

  useClickAway(ref, () => {
    setOpen(false);
  });

  useDebounce(
    () => {
      setDebouncedSearch(searchTerm);
      // Open the results when there's a debounced search term
      if (searchTerm) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    },
    800,
    [searchTerm]
  );

  const resetSearch = () => {
    setSearchTerm("");
    setDebouncedSearch("");
  };

  const onClear = () => {
    resetSearch();
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search />
        </span>
        <Input
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm && setOpen(true)}
          placeholder="Search..."
          className="w-full p-4 py-6 pl-12 border rounded-full border-neutral-400"
          data-search-container="true"
        />
        {debouncedSearch && (
          <span
            className="absolute inset-y-0 right-0 z-10 flex items-center pr-4 cursor-pointer"
            onClick={onClear}
          >
            <X className="text-muted-foreground/50" />
          </span>
        )}
        
        {/* Test button for keyboard hiding - remove in production */}
        <button
          type="button"
          className="absolute inset-y-0 right-12 z-10 flex items-center pr-4 cursor-pointer text-blue-400 hover:text-blue-600"
          onClick={() => {
            console.log('🧪 Test button clicked - testing keyboard hiding');
            console.log('🧪 Current scrollContainerRef:', scrollContainerRef.current);
            if (scrollContainerRef.current) {
              console.log('🧪 Dispatching scroll event...');
              scrollContainerRef.current.dispatchEvent(new Event('scroll'));
            } else {
              console.log('⚠️ No scroll container ref found for testing');
            }
          }}
          aria-label="Test keyboard hiding"
        >
          🧪
        </button>
      </div>
      {open && debouncedSearch && (
        <div className="absolute z-50 w-full mt-2">
          <ScrollArea className="border bg-white flex flex-col rounded-md shadow-lg w-full max-h-[80vh]">
                         <div 
               ref={setScrollContainerRef}
               className="h-full overflow-y-auto"
               data-search-container="true"
             >
              <SearchResults
                debouncedSearch={debouncedSearch}
                setOpen={setOpen}
                onClear={onClear}
              />
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
