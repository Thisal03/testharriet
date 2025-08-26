"use client";
import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SearchIcon from "../icons/search-icon";
import { useDebounce } from "react-use";
import { IoCloseOutline } from "react-icons/io5";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { SearchResults } from "./search-results";
import { useMobileKeyboard } from "@/hooks/use-mobile-keyboard";

const SearchPopup = ({ children }: { children?: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { scrollContainerRef, setScrollContainerRef } = useMobileKeyboard();

  useDebounce(
    () => {
      setDebouncedSearch(searchTerm);
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

  const handleOpen = (open: boolean) => {
    setOpen(open);
    if (!open) {
      resetSearch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <button
            className="relative flex flex-col items-center justify-center flex-shrink-0 h-auto transform focus:outline-none"
            aria-label="search-button"
          >
            <SearchIcon />
            <span className="mt-1 text-xs font-semibold text-balance lg:mt-0 lg:font-normal">
              Search
            </span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent
        className="w-full px-2 -translate-y-10 bg-transparent border-none rounded-none shadow-none h-max top-10 sm:max-w-3xl md:top-15 md:-translate-y-15 md:px-4"
        showCloseButton={false}
      >
        <DialogHeader className="relative bg-white rounded-md h-max">
          <DialogTitle className="sr-only">Search Products</DialogTitle>
          <Label htmlFor="search" className="flex items-center py-0.5">
            <span className="flex items-center justify-center flex-shrink-0 h-full pl-3 pr-1 cursor-pointer focus:outline-none">
              <SearchIcon />
            </span>
            <Input
              id="search"
              className="w-full h-12 mr-10 text-sm placeholder-gray-400 border-0 shadow-none outline-none text-heading lg:h-14 lg:text-base focus-visible:ring-0"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              data-search-container="true"
            />
          </Label>
          <button
            type="button"
            className="absolute top-0 flex items-center justify-center w-12 h-full text-2xl text-gray-400 transition duration-200 ease-in-out outline-none md:text-3xl ltr:right-0 rtl:left-0 md:w-14 hover:text-heading focus:outline-none"
            onClick={onClear}
            aria-label="Clear search"
          >
            <IoCloseOutline className="w-6 h-6" />
          </button>
          
          {/* Test button for keyboard hiding - remove in production */}
          <button
            type="button"
            className="absolute top-0 flex items-center justify-center w-12 h-full text-2xl text-blue-400 transition duration-200 ease-in-out outline-none md:text-3xl ltr:right-12 rtl:left-12 md:w-14 hover:text-blue-600 focus:outline-none"
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
        </DialogHeader>
        {debouncedSearch && (
          <ScrollArea className="bg-white flex flex-col rounded-md w-full h-[80vh]">
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchPopup;
