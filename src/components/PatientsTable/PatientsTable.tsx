import { useContext, useEffect, useState } from "react";
import { patientsApi } from "api";
import { IPatient } from "api/patients/types";
import { Table } from "components/common/Table";
import { SearchContext } from "context";
import { ISortOrder, SortOptions } from "./types";
import styles from "./PatientsTable.module.scss";

const PATIENT_HEADERS = [
  { label: "Full name", type: SortOptions.LAST_NAME },
  { label: "NHS number", type: SortOptions.NHS_NUMBER },
  { label: "Vaccine", type: SortOptions.VACCINE_TYPE },
];

export const PatientsTable = () => {
  const { searchValue } = useContext(SearchContext);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [sortOrder, setSortOrder] = useState<ISortOrder>({
    type: SortOptions.LAST_NAME,
    isDescending: false,
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
    isDescending: boolean,
    patients: IPatient[]
  ) => {
    const sortedPatients = patients.sort((a: IPatient, b: IPatient) => {
      const valueA = a[type] as string;
      const valueB = b[type] as string;

      return isDescending
        ? valueB.localeCompare(valueA)
        : valueA.localeCompare(valueB);
    });

    return sortedPatients;
  };

  const patientRowsConstructor = (patients: IPatient[]) => {
    const sortedPatients = sortPatients(
      sortOrder.type as keyof IPatient,
      sortOrder.isDescending,
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

  const patientRows = patientRowsConstructor(patients);

  return (
    <section className={styles.patientsTable}>
      <Table
        headers={PATIENT_HEADERS}
        rows={patientRows}
        onSortOrder={setSortOrder}
        sortOrder={sortOrder}
      />
    </section>
  );
};
