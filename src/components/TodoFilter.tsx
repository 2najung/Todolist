"use client";
import React from "react";
import styled from "@emotion/styled";

interface Props {
  filter: string;
  setFilter: (filter: string) => void;
}

const TodoFilter = ({ filter, setFilter }: Props) => {
  return (
    <FilterContainer>
      {["All", "To Do", "Done"].map((type) => (
        <FilterButton
          key={type}
          active={filter === type}
          onClick={() => setFilter(type)}
        >
          {type}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default TodoFilter;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 12px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? "#EBF4FF" : "#fff")};
  color: ${({ active }) => (active ? "#2182F3" : "#000")};
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  width: 108px;
  box-sizing: border-box;
`;
