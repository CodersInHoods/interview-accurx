import { useContext, useEffect, useState } from "react";
import { patientsApi } from "api";
import { IPatient } from "api/patients/types";
import { Table } from "components/common/Table";
import { SearchContext } from "context";
import { ISortOrder, SortDirection, SortOptions } from "./types";
import styles from "./PatientsTable.module.scss";

const PATIENT_HEADERS = ["Full name", "NHS number", "Vaccine"];

export const PatientsTable = () => {
  const { searchValue } = useContext(SearchContext);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [sortOrder, setSortOrder] = useState<ISortOrder>({
    type: SortOptions.LAST_NAME,
    order: SortDirection.DESC,
  });

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const patients = await patientsApi.getPatients(searchValue);
      isMounted && setPatients(patients);
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [searchValue]);

  const sortPatients = (
    type: keyof IPatient,
    order: string,
    patients: IPatient[]
  ) => {
    const sortedPatients = patients.sort((a: IPatient, b: IPatient) => {
      const valueA = a[type] as string;
      const valueB = b[type] as string;

      return order === SortDirection.DESC
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    return sortedPatients;
  };

  const patientRowsConstructor = (patients: IPatient[]) => {
    const sortedPatients = sortPatients(
      sortOrder.type as keyof IPatient,
      sortOrder.order,
      patients
    );

    return sortedPatients.map(
      ({ firstName, lastName, nhsNumber, vaccineType }) => [
        `${firstName} ${lastName}`,
        nhsNumber,
        vaccineType,
      ]
    );
  };

  const sortOrderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [type, order] = event.target.value.split("_") as [
      SortOptions,
      SortDirection
    ];

    setSortOrder({ type, order });
  };

  const patientRows = patientRowsConstructor(patients);

  return (
    <section className={styles.patientsTable}>
      <div className={styles.navigation}>
        <select onChange={sortOrderHandler}>
          <option value={`${SortOptions.LAST_NAME}_${SortDirection.DESC}`}>
            By Last name: A-Z
          </option>
          <option value={`${SortOptions.LAST_NAME}_${SortDirection.ASC}`}>
            By Last name: Z-A
          </option>
        </select>
      </div>
      <Table headers={PATIENT_HEADERS} rows={patientRows} />
    </section>
  );
};
