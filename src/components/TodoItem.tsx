"use client";
import React from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { todoState, Todo } from "../store/todo";
import CheckIcon from "../../public/check.svg";
import CloseIcon from "../../public/close.svg";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const [todos, setTodos] = useRecoilState(todoState);

  const toggleComplete = () => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const removeTodo = () => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <ItemContainer>
      <LeftSection>
        <CheckCircle
          data-testid="check-button"
          completed={todo.completed}
          onClick={toggleComplete}
        >
          {todo.completed && (
            <CheckIcon data-testid="check-icon" fill="#ffffff" />
          )}
        </CheckCircle>
        <TodoText completed={todo.completed}>{todo.text}</TodoText>
      </LeftSection>
      <DeleteButton data-testid="delete-button" onClick={removeTodo}>
        <CloseIcon fill="#b9b9b9" />
      </DeleteButton>
    </ItemContainer>
  );
};

export default TodoItem;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 16px;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CheckCircle = styled.div<{ completed: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid
    ${({ completed }) => (completed ? "transparent" : "#E5E5E5")};
  background-color: ${({ completed }) =>
    completed ? "#2182F3" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TodoText = styled.span<{ completed: boolean }>`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: ${({ completed }) => (completed ? "#868686" : "#000")};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
