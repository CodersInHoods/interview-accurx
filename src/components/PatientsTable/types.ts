export enum SortDirection {
  DESC = "DESC",
  ASC = "ASC",
}

export enum SortOptions {
  LAST_NAME = "lastName",
}

export interface ISortOrder {
  type: SortOptions;
  order: SortDirection;
}
