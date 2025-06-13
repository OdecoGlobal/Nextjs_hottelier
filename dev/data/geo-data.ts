import { prisma } from '@/db/prisma';
import {
  insertCountrySchema,
  insertStateSchema,
  insertCitySchema,
} from '@/lib/schemas/validator';
import csv from 'csvtojson';

import path from 'path';

const allowedCountryCodes = new Set(['NG']);

async function importCountries() {
  const filePath = path.join(process.cwd(), 'dev/data/countries.csv');
  const data = await csv().fromFile(filePath);
  const filtered = data.filter(c => allowedCountryCodes.has(c.iso2));
  const countries = insertCountrySchema.array().parse(filtered);
  console.log(`Importing ${filtered.length} countries`);

  for (const c of countries) {
    try {
      await prisma.country.upsert({
        where: { iso2: c.iso2 },
        update: {
          name: c.name,
          iso2: c.iso2,
          iso3: c.iso3,
          phoneCode: c.phoneCode,
          capital: c.capital,
          currency: c.currency,
          currencyName: c.currency_name,
          region: c.region,
          nationality: c.nationality,
        },
        create: {
          name: c.name,
          iso2: c.iso2,
          iso3: c.iso3,
          phoneCode: c.phoneCode,
          capital: c.capital,
          currency: c.currency,
          currencyName: c.currency_name,
          region: c.region,
          nationality: c.nationality,
        },
      });
    } catch (error) {
      console.error(`Failed to import country ${c.name}`, error);
    }
  }
  console.log('Finished importing countries.');
}

async function importStates() {
  const filePath = path.join(process.cwd(), 'dev/data/states.csv');
  const data = await csv().fromFile(filePath);
  const filtered = data.filter(s => allowedCountryCodes.has(s.country_code));
  const states = insertStateSchema.array().parse(filtered);
  console.log(`Importing ${filtered.length} states`);

  for (const s of states) {
    const country = await prisma.country.findUnique({
      where: { iso2: s.country_code },
    });

    if (!country) {
      console.warn(
        `Skipping state ${s.name}, country not found: ${s.country_code}`
      );
      continue;
    }

    try {
      await prisma.state.upsert({
        where: { stateId: Number(s.id) },
        update: {
          name: s.name,
          stateId: Number(s.id),
          stateCode: s.state_code,
          countryCode: s.country_code,
          countryName: s.country_name,
          countryId: country.id,
        },
        create: {
          name: s.name,
          stateId: Number(s.id),
          stateCode: s.state_code,
          countryCode: s.country_code,
          countryName: s.country_name,
          countryId: country.id,
        },
      });
    } catch (error) {
      console.error(`Failed to import state ${s.name}`, error);
    }
  }
  console.log('Finished importing states.');
}
async function importCities() {
  const filePath = path.join(process.cwd(), 'dev/data/cities.csv');
  const data = await csv().fromFile(filePath);
  const filtered = data.filter(c => allowedCountryCodes.has(c.country_code));
  const cities = insertCitySchema.array().parse(filtered);
  console.log(`Importing ${filtered.length} cities`);

  for (const c of cities) {
    const state = await prisma.state.findUnique({
      where: { stateId: Number(c.state_id) },
    });

    if (!state) {
      console.warn(
        `Skipping state ${c.name}, state not found: ${c.state_name}`
      );
      continue;
    }

    try {
      await prisma.city.upsert({
        where: { cityId: Number(c.id) },
        update: {
          name: c.name,
          stateId: state.id,
          stateUqId: Number(c.state_id),
          stateCode: c.state_code,
          countryName: c.country_name,
          cityId: Number(c.id),
          stateName: c.state_name,
        },

        create: {
          name: c.name,
          stateId: state.id,
          stateUqId: Number(c.state_id),
          stateCode: c.state_code,
          countryName: c.country_name,
          cityId: Number(c.id),
          stateName: c.state_name,
        },
      });
    } catch (error) {
      console.error(`Failed to import city ${c.name}`, error);
    }
  }
  console.log('Finished importing cities.');
}

async function main() {
  try {
    await importCountries();
    await importStates();
    await importCities();
    console.log('Import done');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
main();
