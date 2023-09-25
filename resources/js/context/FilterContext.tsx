import { PropsWithChildren, useState } from "react";
import { createContext } from "react";

interface FilterContextInterface {
  filter: string;
  getFilter: (tag: string) => void;
  clearFilter: () => void;
}

const defaultContext: FilterContextInterface = {
  filter: "",
  getFilter: () => {},
  clearFilter: () => {},
};

export const FilterContext =
  createContext<FilterContextInterface>(defaultContext);

export const FilterProvider = ({ children }: PropsWithChildren) => {
  const [filter, setFilter] = useState<string>("");

  const getFilter = (tag: string) => setFilter(tag);
  const clearFilter = () => setFilter("");

  const contextValue: FilterContextInterface = {
    filter,
    getFilter,
    clearFilter,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};
