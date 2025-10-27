import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => ({
            value: city.id,
            label: city.name,
          })),
        };
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
        return { options: [] };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    if (onSearchChange) {
      onSearchChange(searchData);
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};
export default Search;
