// @ts-nocheck
import { render, fireEvent, waitFor } from "@testing-library/react";

import { SearchContext } from "context";
import { SortDirection, SortOptions } from "./types";
import { PatientsTable } from "./PatientsTable";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <SearchContext.Provider {...providerProps}>{ui}</SearchContext.Provider>,
    renderOptions
  );
};

describe("PatientTable", () => {
  test("should render all patients", async () => {
    const { container } = customRender(<PatientsTable />, {
      providerProps: {
        value: {
          searchValue: "",
          onSearchChange: jest.fn(),
        },
      },
    });

    await waitFor(() => {
      const rows = container.querySelectorAll("tbody tr");
      expect(rows.length).toBe(25);
    });
  });

  test("should render all patients in asc order", async () => {
    const { container, rerender } = customRender(<PatientsTable />, {
      providerProps: {
        value: {
          searchValue: "",
          onSearchChange: jest.fn(),
        },
      },
    });

    const select = container.querySelector("select");

    fireEvent.change(select, {
      target: { value: `${SortOptions.LAST_NAME}_${SortDirection.ASC}` },
    });

    let firstCells;

    await waitFor(() => {
      firstCells = container.querySelectorAll("tbody tr td:first-child");
      expect(firstCells.length).toEqual(25);
    });

    const unSortedLastNames = [...firstCells].map((firstCell) => {
      const nameArray = firstCell.textContent.split(" ");
      nameArray.shift();

      return nameArray.join(" ");
    });

    const sortedLastNames = [...unSortedLastNames].sort((a, b) =>
      b.localeCompare(a)
    );

    sortedLastNames.forEach((name, index) => {
      expect(name).toEqual(unSortedLastNames[index]);
    });
  });

  test("should render all patients that matches search value", async () => {
    const { container } = customRender(<PatientsTable />, {
      providerProps: {
        value: {
          searchValue: "ra",
          onSearchChange: jest.fn(),
        },
      },
    });

    await waitFor(() => {
      const rows = container.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        expect(row.textContent?.toLowerCase()).toContain("ra");
      });

      expect(rows.length).toBe(10);
    });
  });
});
