import React from "react";

const Search = ({ newSearch, handleSearchChange }) => {
  return (
    <form>
      Find countries: <input value={newSearch} onChange={handleSearchChange} />
    </form>
  );
};

export default Search;
