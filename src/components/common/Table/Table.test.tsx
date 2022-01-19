import { render } from "@testing-library/react";
import { Table } from "./Table";

describe("Table component", () => {
  const props = {
    headers: ["Col 1", "Col 2"],
    rows: [
      ["Row 1 Cell 1", "Row 1 Cell 2"],
      ["Row 2 Cell 1", "Row 2 Cell 2"],
    ],
  };

  test("should render correct headers", () => {
    const { container } = render(<Table {...props} />);
    const headerCells = container.querySelectorAll("thead th");

    props.headers.forEach((header, index) => {
      expect(headerCells[index].textContent).toBe(header);
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
});
