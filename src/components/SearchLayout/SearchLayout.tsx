import { PatientSearch } from "components/PatientSearch";
import styles from "./SearchLayout.module.scss";

export const SearchLayout: React.FC = (props) => {
  return (
    <div className={styles.wrapper}>
      <PatientSearch />
      {props.children}
    </div>
  );
};
