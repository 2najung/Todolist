"use client";
import React from "react";
import styled from "@emotion/styled";

interface Props {}

const TodoFilter = ({}: Props) => {
  return <Container></Container>;
};

export default TodoFilter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;
