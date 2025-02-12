"use client";
import React from "react";
import styled from "@emotion/styled";

interface Props {}

const TodoList = ({}: Props) => {
  return <Container></Container>;
};

export default TodoList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;
