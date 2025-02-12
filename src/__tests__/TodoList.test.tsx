import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
import { todoState } from "../store/todo";

jest.mock("../../public/check.svg", () => () => (
  <svg data-testid="check-icon" />
));
jest.mock("../../public/close.svg", () => () => (
  <svg data-testid="close-icon" />
));

describe("TodoList Component", () => {
  const setup = () => {
    return render(
      <RecoilRoot initializeState={({ set }) => set(todoState, [])}>
        <>
          <TodoInput />
          <TodoList />
        </>
      </RecoilRoot>
    );
  };

  it("할 일 목록이 올바르게 렌더링된다", () => {
    setup();

    expect(screen.getByText("할 일이 없습니다.")).toBeInTheDocument();
  });

  it("할 일을 추가하면 목록에 반영된다", async () => {
    setup();

    const input = screen.getByPlaceholderText("할 일을 입력하세요");

    fireEvent.change(input, { target: { value: "새로운 할 일" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("새로운 할 일")).toBeInTheDocument();
    });
  });

  it("체크 버튼을 클릭하면 완료 상태가 변경된다", async () => {
    setup();
    const input = screen.getByPlaceholderText("할 일을 입력하세요");

    fireEvent.change(input, { target: { value: "완료할 할 일" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("완료할 할 일")).toBeInTheDocument();
    });

    const checkButton = screen.getByTestId("check-button");
    const todoText = screen.getByText("완료할 할 일");

    expect(todoText).toHaveStyle("color: rgb(0, 0, 0)");

    fireEvent.click(checkButton);

    await waitFor(() => {
      expect(todoText).toHaveStyle("color: rgb(134, 134, 134)");
    });
  });

  it("삭제 버튼을 클릭하면 할 일이 목록에서 사라진다", async () => {
    setup();

    const input = screen.getByPlaceholderText("할 일을 입력하세요");

    fireEvent.change(input, { target: { value: "삭제할 할 일" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("삭제할 할 일")).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("삭제할 할 일")).not.toBeInTheDocument();
    });
  });

  it("필터 버튼을 클릭하면 필터링된 항목만 표시된다", async () => {
    setup();

    const input = screen.getByPlaceholderText("할 일을 입력하세요");

    fireEvent.change(input, { target: { value: "할 일 1" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    fireEvent.change(input, { target: { value: "할 일 2" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const checkButton = screen.getAllByTestId("check-button")[0];
    fireEvent.click(checkButton);

    const doneFilterButton = screen.getByText("Done");
    fireEvent.click(doneFilterButton);

    await waitFor(() => {
      expect(screen.getByText("할 일 1")).toBeInTheDocument();
      expect(screen.queryByText("할 일 2")).not.toBeInTheDocument();
    });

    const todoFilterButton = screen.getByText("To Do");
    fireEvent.click(todoFilterButton);

    await waitFor(() => {
      expect(screen.getByText("할 일 2")).toBeInTheDocument();
      expect(screen.queryByText("할 일 1")).not.toBeInTheDocument();
    });
  });
});
