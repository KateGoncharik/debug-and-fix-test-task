import { useState } from 'react';
import styled from 'styled-components';
import { useCharacters } from '../providers';

export function Filters() {
  const { filters, setFilters } = useCharacters();

  const [nameValue, setNameValue] = useState(filters.name);
  const [statusValue, setStatusValue] = useState(filters.status);
  const [typeValue, setTypeValue] = useState(filters.type);
  const [genderValue, setGenderValue] = useState(filters.gender);

  const handleFiltersApply = () => {
    setFilters({
      name: nameValue,
      status: statusValue,
      type: typeValue,
      gender: genderValue
    });
  };

  return (
    <FiltersContainer>
      <FilterGroupsWrapper>
        <FiltersSmallContainer>
          <StyledLabel htmlFor="name">Name</StyledLabel>
          <StyledInput
            value={nameValue}
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
            type="text"
            name="name"
            placeholder="Rick"
          />
          <StyledLabel htmlFor="name">Status</StyledLabel>
          <StyledInput
            value={statusValue}
            onChange={(e) => {
              setStatusValue(e.target.value);
            }}
            type="text"
            name="status"
            placeholder="Alive"
          />
        </FiltersSmallContainer>
        <FiltersSmallContainer>
          <StyledLabel htmlFor="name">Type</StyledLabel>
          <StyledInput
            value={typeValue}
            onChange={(e) => {
              setTypeValue(e.target.value);
            }}
            type="text"
            name="type"
            placeholder="Human"
          />
          <StyledLabel htmlFor="name">Gender</StyledLabel>
          <StyledInput
            value={genderValue}
            onChange={(e) => {
              setGenderValue(e.target.value);
            }}
            type="text"
            name="gender"
            placeholder="Male"
          />
        </FiltersSmallContainer>
      </FilterGroupsWrapper>

      <ApplyFiltersButton type="button" onClick={handleFiltersApply}>
        Apply
      </ApplyFiltersButton>
    </FiltersContainer>
  );
}

const StyledLabel = styled.label`
  display: block;
  margin: 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

const ApplyFiltersButton = styled.button`
  margin-top: 10px;
  padding: 2%;
  transition: 1s;
  border-radius: 10px;
  background-color: white;
  font-weight: 700;
  color: #3bb2ca;
  &:hover {
    background-color: #3bb2ca;
    color: white;
    cursor: pointer;
    transition: 1s;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  font-size: 16px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  &::placeholder {
    color: #999;
  }
`;

const FilterGroupsWrapper = styled.div`
  display: flex;

  justify-content: space-between;

  align-content: center;
`;
const FiltersSmallContainer = styled.div`
  width: 45%;

  display: flex;

  flex-direction: column;

  justify-content: space-between;

  align-content: center;

  flex-wrap: wrap;
`;

const FiltersContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: space-between;

  align-items: center;

  flex-wrap: wrap;
`;
