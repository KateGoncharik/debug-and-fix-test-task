import { useState } from 'react';
import styled from 'styled-components';

export function Filters() {
  const searchParams = new URLSearchParams(document.location.search);
  const [nameValue, setNameValue] = useState(searchParams.get('name') ?? '');
  const [statusValue, setStatusValue] = useState(
    searchParams.get('status') ?? ''
  );
  const [typeValue, setTypeValue] = useState(searchParams.get('type') ?? '');
  const [genderValue, setGenderValue] = useState(
    searchParams.get('gender') ?? ''
  );
  // TODO get state values and pass them to url
  // should we persist them?

  const updateUrl = () => {
    const newSearchParams = new URLSearchParams();

    if (nameValue) newSearchParams.set('name', nameValue);
    if (statusValue) newSearchParams.set('status', statusValue);
    if (typeValue) newSearchParams.set('type', typeValue);
    if (genderValue) newSearchParams.set('gender', genderValue);

    const newUrl = '?' + newSearchParams.toString();
    window.history.pushState({ path: newUrl }, '', newUrl);
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

      <ApplyFiltersButton type="button" onClick={updateUrl}>
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
