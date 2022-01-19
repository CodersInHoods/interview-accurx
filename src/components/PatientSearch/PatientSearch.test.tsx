// @ts-nocheck
import { render, fireEvent, waitFor } from "@testing-library/react";

import { SearchContext } from "context";
import { PatientSearch } from "./PatientSearch";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <SearchContext.Provider {...providerProps}>{ui}</SearchContext.Provider>,
    renderOptions
  );
};

describe("PatientSearch", () => {
  const providerProps = {
    value: {
      searchValue: "smith",
      onSearchChange: jest.fn(),
    },
  };

  test("should consume context searchValue", () => {
    const { container } = customRender(<PatientSearch />, { providerProps });
    const input = container.querySelector("input");

    expect(input?.value).toBe("smith");
  });

  test("should reset searchValue on click", () => {
    const { container } = customRender(<PatientSearch />, { providerProps });
    const input = container.querySelector("input");
    const resetBtn = container.querySelector("button");

    expect(input?.value).toBe("smith");

    fireEvent.click(resetBtn);

    expect(input?.value).toBe("");
  });

  test("should trigger the context callback", async () => {
    const { container } = customRender(<PatientSearch />, { providerProps });
    const input = container.querySelector("input");
    fireEvent.change(input, { target: { value: "smith" } });

    await waitFor(expect(providerProps.value.onSearchChange).toBeCalled);
  });
});
