"use client";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { todoState } from "../store/todo";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import styled from "@emotion/styled";

const TodoList = () => {
  const [filter, setFilter] = useState("All");
  const todos = useRecoilValue(todoState);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "To Do") return !todo.completed;
    if (filter === "Done") return todo.completed;
    return true;
  });

  return (
    <ListContainer>
      <TodoFilter filter={filter} setFilter={setFilter} />
      <CountText>총 {filteredTodos.length}개</CountText>
      {filteredTodos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </ListContainer>
  );
};

export default TodoList;

const ListContainer = styled.div`
  width: 737px;
  margin-top: 32px;
  padding: 32px;
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const CountText = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0%;
  padding: 16px;
  margin: 0;
`;
