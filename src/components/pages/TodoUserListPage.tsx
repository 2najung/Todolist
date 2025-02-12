"use client";
import React from "react";
import styled from "@emotion/styled";
import TodoInput from "../TodoInput";
import TodoFilter from "../TodoFilter";
import TodoList from "../TodoList";

interface Props {}

const TodoUserListPage = ({}: Props) => {
  return (
    <Container>
      <Title>To Do List</Title>
      <TodoInput />
      <TodoFilter />
      <TodoList />
    </Container>
  );
};

export default TodoUserListPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  line-height: 72px;
  color: #333333;
`;
