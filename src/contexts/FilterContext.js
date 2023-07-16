import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [originFilter, setOriginFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("");
  const [mdSelectFilter, setMdSelectFilter] = useState("");

  return (
    <FilterContext.Provider
      value={{
        originFilter,
        setOriginFilter,
        deliveryFilter,
        setDeliveryFilter,
        mdSelectFilter,
        setMdSelectFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
