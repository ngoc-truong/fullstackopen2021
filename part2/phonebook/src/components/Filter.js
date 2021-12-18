import React from "react";

const Filter = ({ changeFilterName }) => {
  return (
    <>
      filter shown with <input onChange={changeFilterName} />
    </>
  );
};

export default Filter;
