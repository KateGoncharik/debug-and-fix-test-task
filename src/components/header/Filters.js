import { useState } from 'react';
import styled from 'styled-components';

import { useCharacters } from '../providers';

export function Filters() {
  const { filters, setFilters, resetActivePage } = useCharacters();

  const [nameValue, setNameValue] = useState(filters.name);
  const [statusValue, setStatusValue] = useState(filters.status);
  const [speciesValue, setSpeciesValue] = useState(filters.species);
  const [typeValue, setTypeValue] = useState(filters.type);
  const [genderValue, setGenderValue] = useState(filters.gender);

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  function handleFiltersApply() {
    setFilters({
      name: nameValue,
      status: statusValue,
      species: speciesValue,
      type: typeValue,
      gender: genderValue
    });
    resetActivePage();
  }

  const emptyFilterValue = '';

  function handleFiltersReset() {
    setFilters({
      name: emptyFilterValue,
      status: emptyFilterValue,
      species: emptyFilterValue,
      type: emptyFilterValue,
      gender: emptyFilterValue
    });
    setNameValue(emptyFilterValue);
    setStatusValue(emptyFilterValue);
    setSpeciesValue(emptyFilterValue);
    setGenderValue(emptyFilterValue);
    setTypeValue(emptyFilterValue);

    resetActivePage();
  }

  return (
    <FiltersWrapper>
      <FiltersContainer>
        <ToggleButton onClick={() => setIsFiltersVisible(!isFiltersVisible)}>
          {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
        </ToggleButton>

        {isFiltersVisible && (
          <>
            <FilterGroupsWrapper>
              <StyledInputContainer>
                <StyledLabel htmlFor="name-filter-input">Name</StyledLabel>
                <StyledInput
                  value={nameValue}
                  onChange={(e) => {
                    setNameValue(e.target.value);
                  }}
                  id="name-filter-input"
                  type="text"
                  name="name"
                  onKeyDown={(e) => e.key === 'Enter' && handleFiltersApply()}
                  placeholder="Rick"
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledLabel htmlFor="status-filter-input">Status</StyledLabel>
                <StyledInput
                  onKeyDown={(e) => e.key === 'Enter' && handleFiltersApply()}
                  value={statusValue}
                  onChange={(e) => {
                    setStatusValue(e.target.value);
                  }}
                  id="status-filter-input"
                  type="text"
                  name="status"
                  placeholder="Alive"
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledLabel htmlFor="species-filter-input">
                  Species
                </StyledLabel>
                <StyledInput
                  onKeyDown={(e) => e.key === 'Enter' && handleFiltersApply()}
                  value={speciesValue}
                  onChange={(e) => {
                    setSpeciesValue(e.target.value);
                  }}
                  id="species-filter-input"
                  type="text"
                  name="type"
                  placeholder="Human"
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledLabel htmlFor="type-filter-input">Type</StyledLabel>
                <StyledInput
                  onKeyDown={(e) => e.key === 'Enter' && handleFiltersApply()}
                  value={typeValue}
                  onChange={(e) => {
                    setTypeValue(e.target.value);
                  }}
                  id="type-filter-input"
                  type="text"
                  name="type"
                  placeholder="Superhuman"
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledLabel htmlFor="gender-filter-input">Gender</StyledLabel>
                <StyledInput
                  onKeyDown={(e) => e.key === 'Enter' && handleFiltersApply()}
                  value={genderValue}
                  onChange={(e) => {
                    setGenderValue(e.target.value);
                  }}
                  id="gender-filter-input"
                  type="text"
                  name="gender"
                  placeholder="Male"
                />
              </StyledInputContainer>
            </FilterGroupsWrapper>
            <FilterButtonsContainer>
              <FiltersButton type="button" onClick={handleFiltersApply}>
                Apply
              </FiltersButton>
              <FiltersButton type="button" onClick={handleFiltersReset}>
                Reset
              </FiltersButton>
            </FilterButtonsContainer>
          </>
        )}
      </FiltersContainer>
    </FiltersWrapper>
  );
}

const ToggleButton = styled.button`
  align-self: flex-end;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: #3bb2ca;
  color: white;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2a8fa7;
  }
`;

const FilterButtonsContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;

  justify-content: flex-end;
`;

const FiltersButton = styled.button`
  margin-top: 10px;
  padding: 15px;
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

const StyledInputContainer = styled.div`
  width: 100%;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;

  font-size: 16px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #d8f251;
    box-shadow: 0 0 5px #d8f251;
  }

  &::placeholder {
    color: #999;
  }
`;

const FilterGroupsWrapper = styled.div`
  display: flex;
  gap: 10px;

  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FiltersContainer = styled.div`
  width: 100%;
  padding: 2% 5%;
  display: flex;

  flex-direction: column;
  border-radius: 20px;

  align-items: center;
  background-color: #263750;
`;

const FiltersWrapper = styled.div`
  width: 100%;
`;
