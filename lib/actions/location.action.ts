import { CountryData, StateData, CityData } from "@/types";
import { axiosInstance } from "../axios";
type CountryResponse = {
  data: {
    countries: CountryData[];
    totalPages: number;
  };
};

type StateResponse = {
  data: {
    states: StateData[];
    totalPages: number;
  };
};

type CityResponse = {
  data: {
    cities: CityData[];
    totalPages: number;
  };
};

export async function getAllCountries(
  searchQuery = "",
  limit = 10
): Promise<CountryResponse> {
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    params.append("limit", limit.toString());
    const res = await axiosInstance(`locations/countries?${params.toString()}`);
    if (res.status !== 200) {
      throw new Error("Error fetching countries");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      data: {
        countries: [],
        totalPages: 0,
      },
    };
  }
}

export async function getStateByCountry(
  countryId: string,
  searchQuery = "",
  limit = 10
): Promise<StateResponse> {
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    params.append("limit", limit.toString());
    const res = await axiosInstance(
      `locations/countries/${countryId}/states?${params.toString()}`
    );
    if (res.status !== 200) {
      throw new Error("Error fetching states");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      data: {
        states: [],
        totalPages: 0,
      },
    };
  }
}
export async function getCitiesByState(
  stateId: string,
  searchQuery = "",
  limit = 10
): Promise<CityResponse> {
  try {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    params.append("limit", limit.toString());
    const res = await axiosInstance(
      `locations/states/${stateId}/cities?${params.toString()}`
    );
    if (res.status !== 200) {
      throw new Error("Error fetching cities");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      data: {
        cities: [],
        totalPages: 0,
      },
    };
  }
}
