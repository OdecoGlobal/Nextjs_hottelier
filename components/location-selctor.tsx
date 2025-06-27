'use client';

import countries from '@/public/data/location-data/countries.json';
import states from '@/public/data/location-data/states.json';
import cities from '@/public/data/location-data/cities.json';

import { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { CountryData, StateData, CityData } from '@/types';
type LocationLevel = 'country' | 'state' | 'city';

type LocationItem = CountryData | StateData | CityData;

type LocationSelectorProps = {
  level: LocationLevel;
  selectedValue?: string | null;
  parentId?: string | null;
  onSelect: (value: LocationItem | null) => void;
  placeholder?: string;
  className?: string;
  allowClear?: boolean;
};

export const LocationSelector = ({
  level,
  selectedValue,
  parentId,
  onSelect,
  placeholder = `Select ${level}`,
  className = '',
  allowClear = false,
}: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<LocationItem[]>([]);

  useEffect(() => {
    if (level === 'country') {
      const filteredCountries = (countries as CountryData[]).filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setItems(filteredCountries);
    } else if (level === 'state' && parentId) {
      const country = countries.find(c => c.iso2 === parentId);
      if (country) {
        const filteredStates = states.filter(
          state =>
            state.country_code === country.iso2 &&
            state.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setItems(filteredStates);
      }
    } else if (level === 'city' && parentId) {
      const state = states.find(s => s.state_code === parentId);
      if (state) {
        const filteredCities = cities.filter(
          city =>
            city.state_code === state.state_code &&
            city.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setItems(filteredCities);
      }
    }
  }, [level, parentId, searchQuery]);

  const selectedItem = items.find(item => item.name === selectedValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${className} ${
            !selectedValue ? 'text-muted-foreground' : ''
          }`}
        >
          {selectedItem?.name || placeholder}
          {allowClear && selectedValue && (
            <span
              className="ml-2 text-muted-foreground hover:text-foreground"
              onClick={e => {
                e.stopPropagation();
                onSelect(null);
              }}
            >
              ×
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${level}...`}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No {level} found.</CommandEmpty>
            <CommandGroup>
              {items.map(item => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={`ml-auto ${
                      item.id === selectedValue ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
