import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoFilter from "../components/TodoFilter";

describe("TodoFilter Component", () => {
  it("필터 버튼을 클릭하면 필터링이 변경된다", () => {
    let filter = "All";
    const setFilter = jest.fn((newFilter) => (filter = newFilter));

    render(<TodoFilter filter={filter} setFilter={setFilter} />);

    const todoButton = screen.getByText("To Do");
    fireEvent.click(todoButton);
    expect(setFilter).toHaveBeenCalledWith("To Do");

    const doneButton = screen.getByText("Done");
    fireEvent.click(doneButton);
    expect(setFilter).toHaveBeenCalledWith("Done");
  });
});
