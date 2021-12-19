import React, { useState, useEffect } from "react";
import Country from "./Country";
import CountryList from "./CountryList";

const Countries = ({ countriesToShow }) => {
  const [countries, setCountries] = useState([]);

  // Populate countries state
  const fillCountries = () => {
    setCountries(countriesToShow);
  };

  // 2nd parameter: Only useEffect when countriesToShow has changed
  useEffect(fillCountries, [countriesToShow]);

  // Event handlers
  const showCountry = (event) => {
    const targetCountry = countries.find(
      (country) => country.name === event.target.value
    );
    setCountries([targetCountry]);
  };

  // Conditional Rendering
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return <CountryList countries={countries} showCountry={showCountry} />;
  }
};

export default Countries;
