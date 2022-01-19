import { PatientsTable } from "components/PatientsTable";
import { SearchLayout } from "components/SearchLayout";
import { SearchContext } from "context";
import { useState } from "react";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchChangeHandler = (newValue: string) => setSearchValue(newValue);

  return (
    <SearchContext.Provider
      value={{ searchValue, onSearchChange: searchChangeHandler }}
    >
      <SearchLayout>
        <PatientsTable />
      </SearchLayout>
    </SearchContext.Provider>
  );
};

export default App;
