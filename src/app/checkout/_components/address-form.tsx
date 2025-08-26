"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import locations from "@/lib/locations.json";
import { PhoneInput } from "@/components/ui/phone-input";
import { Combobox } from "@/components/ui/combo-box";
import { GeoapifyAutocompleteInput } from "@/components/geoapify-autocomplete-input";
import { useRef } from "react";

interface AddressFormProps {
  prefix?: string;
  title?: string;
  hidePhone?: boolean;
}

export const AddressForm = ({
  prefix = "",
  title,
  hidePhone = false,
}: AddressFormProps) => {
  const { control, setValue } = useFormContext();
  const cityDebounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Helper to capitalize first letter of each word
  function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // Function to fetch city details from Geoapify
  const fetchCityDetails = async (city: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
    if (!apiKey || !city) return;
    
    try {
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&type=city&filter=countrycode:lk&lang=en&limit=1&format=json&apiKey=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        return {
          zipCode: result.postcode || "",
          state: result.state || "",
        };
      }
    } catch (error) {
      console.error("Error fetching city details:", error);
    }
    return { zipCode: "", state: "" };
  };

  // Handle city input change with debouncing
  const handleCityChange = async (city: string, field: any) => {
    // Auto-capitalize first letter of each word
    const capitalizedCity = capitalizeWords(city);
    field.onChange(capitalizedCity);
    
    // Clear previous timeout
    if (cityDebounceTimeout.current) {
      clearTimeout(cityDebounceTimeout.current);
    }
    
    // Set new timeout to fetch city details after user stops typing
    cityDebounceTimeout.current = setTimeout(async () => {
      if (capitalizedCity && capitalizedCity.length > 2) {
        const details = await fetchCityDetails(capitalizedCity);
        if (details) {
          // Only update fields if there's actual data, don't clear existing values
          if (details.zipCode && details.zipCode.trim() !== "") {
            setValue(`${prefix}zipCode`, details.zipCode);
          }
          if (details.state && details.state.trim() !== "") {
            setValue(`${prefix}state`, details.state);
          }
        }
      }
    }, 500);
  };

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-medium">{title}</h3>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name={`${prefix}firstName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${prefix}lastName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {!hidePhone && (
        <FormField
          control={control}
          name={`${prefix}phone`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <PhoneInput {...field} defaultCountry="LK" value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name={`${prefix}companyName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name (optional)</FormLabel>
            <FormControl>
              <Input placeholder="Company Name" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${prefix}address`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <GeoapifyAutocompleteInput
                value={field.value ?? ""}
                onSelect={({ address, city, state, zipCode }) => {
                  field.onChange(address);
                  // Only update fields if they have actual values, not undefined
                  if (city !== undefined) {
                    setValue(`${prefix}city`, city || "");
                  }
                  if (state !== undefined) {
                    setValue(`${prefix}state`, state || "");
                  }
                  if (zipCode !== undefined) {
                    setValue(`${prefix}zipCode`, zipCode || "");
                  }
                }}
                placeholder="Address"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name={`${prefix}city`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input 
                  placeholder="City" 
                  {...field} 
                  value={field.value ?? ""} 
                  onChange={(e) => handleCityChange(e.target.value, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${prefix}zipCode`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="Zip Code" maxLength={6} {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name={`${prefix}country`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Combobox
                  items={locations.COUNTRY.map((country) => ({
                    label: country,
                    value: country,
                  }))}
                  onValueChange={field.onChange}
                  value={field.value}
                  label="country"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`${prefix}state`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State/Province</FormLabel>
              <FormControl>
                <Combobox
                  items={locations.STATE.map((state) => ({
                    label: state,
                    value: state,
                  }))}
                  onValueChange={field.onChange}
                  value={field.value}
                  label="state"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
