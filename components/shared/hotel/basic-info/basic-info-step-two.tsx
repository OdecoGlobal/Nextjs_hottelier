'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  getAllCountries,
  getCitiesByState,
  getStateByCountry,
} from '@/lib/actions/location.action';

import { useCallback, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import debounce from 'debounce';
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
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CityData, CountryData, HotelBasicInfoType, StateData } from '@/types';
import SubmitFormButton from '@/components/submit-form-button';

const HotelBasicInfoStepTwo = ({
  form,
  onNext,
  onPrevious,
}: {
  form: UseFormReturn<HotelBasicInfoType>;
  onNext: () => void;
  onPrevious: () => void;
}) => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [searchQueries, setSearchQueries] = useState({
    state: '',
    city: '',
  });
  const [loading, setLoading] = useState({
    countries: true,
    states: false,
    cities: false,
  });
  const [dropdownOpen, setDropdownOpen] = useState({
    country: false,
    state: false,
    city: false,
  });

  const selectedCountry = form.watch('countryId');
  const selectedState = form.watch('stateId');

  const loadCountries = useCallback(async () => {
    setLoading(prev => ({ ...prev, countries: true }));

    try {
      const data = await getAllCountries();
      setCountries(data.data.countries);
    } catch (error) {
      console.log('Error fetching countries', error);
    } finally {
      setLoading(prev => ({ ...prev, countries: false }));
    }
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  useEffect(() => {
    const loadStates = async () => {
      if (!selectedCountry) return;
      form.setValue('state', '');
      form.setValue('city', '');
      setStates([]);
      setCities([]);
      setLoading(prev => ({ ...prev, states: true }));
      try {
        const data = await getStateByCountry(
          selectedCountry,
          searchQueries.state,
          36
        );
        setStates(data.data.states);
      } catch (error) {
        console.log('Error fetching states', error);
      } finally {
        setLoading(prev => ({ ...prev, states: false }));
      }
    };
    const debouncedLoadStates = debounce(loadStates, 300);
    debouncedLoadStates();
    return () => debouncedLoadStates.clear();
  }, [searchQueries.state, selectedCountry, form]);

  useEffect(() => {
    const loadCities = async () => {
      if (!selectedState) return;
      form.setValue('city', '');

      setCities([]);
      setLoading(prev => ({ ...prev, cities: true }));
      try {
        const data = await getCitiesByState(selectedState, searchQueries.city);
        setCities(data.data.cities);
      } catch (error) {
        console.log('Error fetching states', error);
      } finally {
        setLoading(prev => ({ ...prev, cities: false }));
      }
    };
    const debouncedLoadCities = debounce(loadCities, 300);
    debouncedLoadCities();

    return () => debouncedLoadCities.clear();
  }, [searchQueries.city, selectedState, form]);

  return (
    <Card>
      <CardHeader>
        <p className="text-muted-foreground font-semibold">Step 2 of 3</p>
        <h1 className="text-xl md:text-2xl font-bold">Property Address</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onNext)}>
            {/* COUNTRY */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Country</FormLabel>
                  <Popover
                    open={dropdownOpen.country}
                    onOpenChange={open =>
                      setDropdownOpen(prev => ({ ...prev, country: open }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={`w-full justify-between ${
                            !field.value && 'text-muted-foreground'
                          }`}
                        >
                          {field.value
                            ? countries.find(
                                country => country.name === field.value
                              )?.name
                            : 'Select Country'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Command>
                        <CommandInput
                          placeholder="Search Countries"
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>
                            {loading.countries
                              ? 'Loading...'
                              : 'No country found'}
                          </CommandEmpty>
                          <CommandGroup>
                            {countries.map(country => (
                              <CommandItem
                                key={country.name}
                                value={country.name}
                                onSelect={() => {
                                  form.setValue('country', country.name);
                                  form.setValue('countryId', country.id);
                                  setDropdownOpen(prev => ({
                                    ...prev,
                                    country: false,
                                  }));
                                }}
                              >
                                {country.name}

                                <Check
                                  className={`ml-auto ${
                                    country.name === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  }`}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* STATES */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>State</FormLabel>
                  <Popover
                    open={dropdownOpen.state}
                    onOpenChange={open =>
                      setDropdownOpen(prev => ({ ...prev, state: open }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={`w-full justify-between ${
                            !field.value && 'text-muted-foreground'
                          }`}
                        >
                          {field.value
                            ? states.find(state => state.name === field.value)
                                ?.name
                            : 'Select State'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Command>
                        <CommandInput
                          placeholder="Search States"
                          className="h-9"
                          value={searchQueries.state}
                          onValueChange={value =>
                            setSearchQueries(prev => ({
                              ...prev,
                              state: value,
                            }))
                          }
                        />
                        <CommandList>
                          <CommandEmpty>
                            {loading.states ? 'Loading...' : 'No state found'}
                          </CommandEmpty>
                          <CommandGroup>
                            {states.map(state => (
                              <CommandItem
                                key={state.id}
                                value={state.name}
                                onSelect={() => {
                                  form.setValue('state', state.name);
                                  form.setValue('stateId', state.id);
                                  setDropdownOpen(prev => ({
                                    ...prev,
                                    state: false,
                                  }));
                                }}
                              >
                                {state.name}

                                <Check
                                  className={`ml-auto ${
                                    state.name === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  }`}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* CITIES */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>City</FormLabel>
                  <Popover
                    open={dropdownOpen.city}
                    onOpenChange={open =>
                      setDropdownOpen(prev => ({ ...prev, city: open }))
                    }
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={`w-full justify-between ${
                            !field.value && 'text-muted-foreground'
                          }`}
                        >
                          {field.value
                            ? cities.find(city => city.name === field.value)
                                ?.name
                            : 'Select City'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Command>
                        <CommandInput
                          placeholder="Search City"
                          className="h-9"
                          value={searchQueries.city}
                          onValueChange={value =>
                            setSearchQueries(prev => ({
                              ...prev,
                              city: value,
                            }))
                          }
                        />
                        <CommandList>
                          <CommandEmpty>
                            {loading.cities ? 'Loading...' : 'No cities found'}
                          </CommandEmpty>
                          <CommandGroup>
                            {cities.map(city => (
                              <CommandItem
                                key={city.id}
                                value={city.name}
                                onSelect={() => {
                                  form.setValue('city', city.name);
                                  setDropdownOpen(prev => ({
                                    ...prev,
                                    city: false,
                                  }));
                                }}
                              >
                                {city.name}

                                <Check
                                  className={`ml-auto ${
                                    city.name === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  }`}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Address */}

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel> Street Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your street address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel> Zip Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your zip code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitFormButton
              action="Next"
              showPrevious={true}
              showSteps={true}
              currentStep={2}
              totalSteps={3}
              onPrevious={onPrevious}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default HotelBasicInfoStepTwo;
