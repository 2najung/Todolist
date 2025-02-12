"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { todoState } from "../store/todo";

const TodoInput = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() === "" || inputValue.length > 20) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        placeholder="할 일을 입력해 주세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </InputContainer>
  );
};

export default TodoInput;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 737px;
  border-radius: 24px;
  padding: 32px;
  border: none;
  outline: none;
  background-color: #e5e5e5;
  box-sizing: border-box;

  &::placeholder {
    font-size: 20px;
    line-height: 28px;
    font-weight: 400;
    color: #b9b9b9;
  }
`;
