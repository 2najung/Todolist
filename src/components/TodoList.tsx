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
      <FixedHeader>
        <TodoFilter filter={filter} setFilter={setFilter} />
        <CountText>총 {filteredTodos.length}개</CountText>
      </FixedHeader>
      <ScrollableList>
        {filteredTodos.length === 0 ? (
          <p>할 일이 없습니다.</p>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ScrollableList>
    </ListContainer>
  );
};

export default TodoList;

const ListContainer = styled.div`
  width: 737px;
  max-height: 580px;
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

const FixedHeader = styled.div`
  top: 0;
  background-color: white;
  z-index: 10;
  padding-bottom: 10px;
`;

const ScrollableList = styled.div`
  max-height: 350px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d1d1d1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
