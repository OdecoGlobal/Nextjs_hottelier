import countries from '@/public/data/location-data/countries.json';
import states from '@/public/data/location-data/states.json';
import cities from '@/public/data/location-data/cities.json';
import { CityData, CountryData, StateData } from '@/types';

export function generateLocationData() {
  const stateMap = Object.fromEntries(
    (states as StateData[]).map(s => [s.id, s]),
  );
  const countriesMap = Object.fromEntries(
    (countries as CountryData[]).map(c => [c.iso2, c]),
  );
  const locationData = (cities as CityData[])
    .map(city => {
      const state = stateMap[city.state_id];
      const country = countriesMap[state.country_code];
      if (!state || !country) return null;
      return `${city.name}, ${state.name}, ${country.name}`;
    })
    .filter(Boolean);
  return locationData;
}

export const locationData = generateLocationData();
