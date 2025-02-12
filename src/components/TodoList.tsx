"use client";
import React from "react";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { todoState } from "../store/todo";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useRecoilValue(todoState);
  return (
    <ListContainer>
      {todos.length === 0 ? (
        <p>할 일을 추가해주세요.</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </ListContainer>
  );
};

export default TodoList;

const ListContainer = styled.div`
  width: 737px;
  height: 484px;
  border-radius: 24px;
  padding: 32px;
  gap: 32px;
  background-color: #ffffff;
  box-sizing: border-box;
`;
