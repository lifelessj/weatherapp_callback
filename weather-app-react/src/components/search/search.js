import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { value: "New York", label: "New York" },
            { value: "Los Angeles", label: "Los Angeles" },
            { value: "Chicago", label: "Chicago" },
          ]);
        }, 1000);
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
}

export default Search;

