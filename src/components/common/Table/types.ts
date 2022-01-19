import { SortOptions } from "components/PatientsTable/types";

export interface IHeader {
  label: string;
  type: SortOptions;
}
export interface ITable {
  headers: IHeader[];
  rows: string[][];
  onSortOrder: ({
    type,
    isDescending,
  }: {
    type: SortOptions;
    isDescending: boolean;
  }) => void;
  sortOrder: { type: SortOptions; isDescending: boolean };
}
