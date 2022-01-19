import { ITable } from "./types";
import styles from "./Table.module.scss";

export const Table: React.FC<ITable> = ({ headers, rows }) => {
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            {headers.map((header: string, index: number) => (
              <th key={index}>{header}</th>
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
