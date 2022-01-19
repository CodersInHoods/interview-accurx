import { IHeader, ITable } from "./types";
import styles from "./Table.module.scss";
import { SortOptions } from "components/PatientsTable/types";
import { Arrow } from "../Icons/Arrow";

export const Table: React.FC<ITable> = ({
  headers,
  rows,
  onSortOrder,
  sortOrder,
}) => {
  const sortHandler = (type: SortOptions) => {
    const isSameType = sortOrder.type === type;
    const isDescending = isSameType ? !sortOrder.isDescending : false;

    onSortOrder({ type, isDescending });
  };

  if (!rows.length) return <h1 className={styles.error}>No data available</h1>;

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            {headers.map((header: IHeader, index: number) => (
              <th key={index} onClick={() => sortHandler(header.type)}>
                {header.label}
                {header.type === sortOrder.type && (
                  <span className={styles.iconWrapper}>
                    <Arrow
                      direction={!sortOrder.isDescending ? "down" : "up"}
                    />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: string[], index: number) => (
            <tr key={index}>
              {row.map((cell: string, index: number) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
