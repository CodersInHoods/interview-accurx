// @ts-nocheck
import { fireEvent, render } from "@testing-library/react";
import { SortOptions } from "components/PatientsTable/types";
import { Table } from "./Table";

describe("Table component", () => {
  const props = {
    headers: [
      { label: "Col 1", type: SortOptions.LAST_NAME },
      { label: "Col 2", type: SortOptions.NHS_NUMBER },
    ],
    rows: [
      ["Row 1 Cell 1", "Row 1 Cell 2"],
      ["Row 2 Cell 1", "Row 2 Cell 2"],
    ],
    onSortOrder: jest.fn(),
    sortOrder: {
      type: SortOptions.LAST_NAME,
      isDescending: false,
    },
  };

  test("should render correct headers", () => {
    const { container } = render(<Table {...props} />);
    const headerCells = container.querySelectorAll("thead th");
    props.headers.forEach((header, index) => {
      expect(headerCells[index].textContent).toBe(header.label);
    });
  });

  test("should render all rows", () => {
    const { container } = render(<Table {...props} />);
    const rowsEl = container.querySelectorAll("tbody tr");
    expect(rowsEl.length).toBe(2);
  });

  test("should render cells correctly withing tbody", () => {
    const { container } = render(<Table {...props} />);
    const firstRowCellsEl = container.querySelectorAll(
      "tbody tr:first-child td"
    );
    props.rows[0].forEach((cellValue, index) => {
      expect(firstRowCellsEl[index].textContent).toBe(cellValue);
    });
  });

  test("should change sorting order for last name to asc", async () => {
    const { container } = render(<Table {...props} />);

    const fullNameHeaderCell = container.querySelector("thead th:first-child");

    fireEvent.click(fullNameHeaderCell);
    expect(props.onSortOrder).toBeCalled();
    expect(props.onSortOrder).toBeCalledWith({
      type: SortOptions.LAST_NAME,
      isDescending: true,
    });
  });
});
