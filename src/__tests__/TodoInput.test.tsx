import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import TodoInput from "../components/TodoInput";

describe("TodoInput Component", () => {
  it("20자를 초과하는 입력을 방지해야 한다", () => {
    render(
      <RecoilRoot>
        <TodoInput />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    fireEvent.change(input, { target: { value: "12345678901234567890" } });
    expect(input).toHaveValue("12345678901234567890");

    fireEvent.change(input, { target: { value: "123456789012345678901" } });
    expect(input).toHaveValue("12345678901234567890");
  });

  it("미완료된 할 일이 10개 이상이면 추가할 수 없다", () => {
    render(
      <RecoilRoot>
        <TodoInput />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText("할 일을 입력하세요");

    for (let i = 0; i < 10; i++) {
      fireEvent.change(input, { target: { value: `할 일 ${i + 1}` } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    }

    fireEvent.change(input, { target: { value: "할 일 11" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.queryByText("할 일 11")).not.toBeInTheDocument();
  });
});
