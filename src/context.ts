import { createContext } from "react";

interface ISearchContext {
  searchValue: string;
  onSearchChange: (newValue: string) => void;
}

export const SearchContext = createContext<ISearchContext>({
  searchValue: "",
  onSearchChange: () => {},
});
