export enum SortOptions {
  LAST_NAME = "lastName",
  NHS_NUMBER = "nhsNumber",
  VACCINE_TYPE = "vaccineType",
}

export interface ISortOrder {
  type: SortOptions;
  isDescending: boolean;
}
