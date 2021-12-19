import React from "react";

const CountryList = ({ countries, showCountry }) => {
  return countries.map((country, index) => {
    return (
      <div key={index}>
        <p>{country.name}</p>
        <button onClick={showCountry} value={country.name}>
          show
        </button>
      </div>
    );
  });
};

export default CountryList;
