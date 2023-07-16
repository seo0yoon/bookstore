import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [originFilter, setOriginFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("");

  return (
    <FilterContext.Provider
      value={{
        originFilter,
        setOriginFilter,
        deliveryFilter,
        setDeliveryFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
