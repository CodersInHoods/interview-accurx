import { SearchContext } from "context";
import { debounce } from "helpers/debouncer";
import { useContext, useEffect, useState } from "react";
import styles from "./PatientSearch.module.scss";

export const PatientSearch = () => {
  const { searchValue, onSearchChange } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    debounce(() => onSearchChange(inputValue));
  }, [inputValue]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  return (
    <form className={styles.form}>
      <input type="text" placeholder={'Search by...'} value={inputValue} onChange={changeHandler} />
      <button type="reset" onClick={() => setInputValue("")}>
        Clear
      </button>
    </form>
  );
};
