import {
  insertCountrySchema,
  insertStateSchema,
  insertCitySchema,
} from '@/lib/schemas/validator';
import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

const allowedCountryCodes = new Set(['NG']);

async function convertAndSave() {
  console.log('STARTING');
  const countriesCSV = path.join(process.cwd(), 'dev/data/countries.csv');
  const statesCSV = path.join(process.cwd(), 'dev/data/states.csv');
  const citiesCSV = path.join(process.cwd(), 'dev/data/cities.csv');
  const outputFolder = path.join(process.cwd(), 'public/data/location-data');
  if (!fs.existsSync(outputFolder))
    fs.mkdirSync(outputFolder, { recursive: true });

  console.log('COUNTRY STARTING');

  const rawCountries = await csv().fromFile(countriesCSV);
  const filteredCountries = rawCountries.filter(c =>
    allowedCountryCodes.has(c.iso2)
  );
  const countries = insertCountrySchema.array().parse(filteredCountries);
  fs.writeFileSync(
    path.join(outputFolder, 'countries.json'),
    JSON.stringify(countries, null, 2)
  );

  console.log('STATE STARTING');

  const rawStates = await csv().fromFile(statesCSV);
  const filteredStates = rawStates.filter(s =>
    allowedCountryCodes.has(s.country_code)
  );
  const states = insertStateSchema.array().parse(filteredStates);
  fs.writeFileSync(
    path.join(outputFolder, 'states.json'),
    JSON.stringify(states, null, 2)
  );
  console.log('CITIES STARTING');

  const rawCities = await csv().fromFile(citiesCSV);
  const filteredCities = rawCities.filter(c =>
    allowedCountryCodes.has(c.country_code)
  );
  const cities = insertCitySchema.array().parse(filteredCities);
  fs.writeFileSync(
    path.join(outputFolder, 'cities.json'),
    JSON.stringify(cities, null, 2)
  );
  console.log('✅ Countries, states, and cities exported to JSON');
}

convertAndSave().catch(console.error);
