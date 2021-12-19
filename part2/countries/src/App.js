import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

const App = () => {
  const [newSearch, setNewSearch] = useState("");
  const [countries, setCountries] = useState([]);

  // Hook for countries
  const hookCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hookCountries, []);

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const countriesToShow = countries.filter((country) => {
    return country.name.toLowerCase().includes(newSearch.toLowerCase());
  });

  return (
    <div>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <Countries countriesToShow={countriesToShow} />
    </div>
  );
};

export default App;
