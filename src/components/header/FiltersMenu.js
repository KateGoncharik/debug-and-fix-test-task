import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useCallback } from 'react';

export function FiltersMenu({
  settings,
  setSettings,
  filters,
  setFilters,
  resetActivePage
}) {
  const [nameValue, setNameValue] = useState(filters.name);
  const [statusValue, setStatusValue] = useState(filters.status);
  const [speciesValue, setSpeciesValue] = useState(filters.species);
  const [typeValue, setTypeValue] = useState(filters.type);
  const [genderValue, setGenderValue] = useState(filters.gender);
  const isVisible = settings.visible;

  function handleFiltersApply() {
    setFilters({
      name: nameValue,
      status: statusValue,
      species: speciesValue,
      type: typeValue,
      gender: genderValue
    });
    resetActivePage();
    togglePopup();
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
    togglePopup();
  }

  function togglePopup() {
    setSettings((prevState) => ({
      ...prevState,
      visible: !prevState.visible
    }));
  }
  document.body.style = isVisible ? 'overflow: hidden;' : 'overflow: auto;';
  const cachedTogglePopup = useCallback(togglePopup, [setSettings]);

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('bAPiCi')) {
        cachedTogglePopup(e);
      }
    });
  }, [cachedTogglePopup]);
  return (
    <FiltersMenuContainer visible={isVisible}>
      <StyledFiltersMenu>
        <CloseIcon onClick={togglePopup} />
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
            <StyledLabel htmlFor="species-filter-input">Species</StyledLabel>
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
      </StyledFiltersMenu>
    </FiltersMenuContainer>
  );
}

const CloseIcon = styled.div`
  cursor: pointer;
  position: fixed;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;
  transition: 2s;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
  }

  &:before {
    left: 4.5px;
    transform: rotate(-45deg);
  }

  &:after {
    right: 4.5px;
    transform: rotate(45deg);
  }
`;

const FiltersMenuContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visible 0.3s;

  ${({ visible }) =>
    visible &&
    `
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}
`;

const StyledFiltersMenu = styled.div`
  position: absolute;
  width: 30%;
  margin: 0 auto;
  height: 100%;
  right: 0;
  background: #263750;
  border-radius: 15px 0 0 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;
  transition: 2s;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1000px) {
    width: 45%;
  }
  @media (max-width: 768px) {
    width: 55%;
  }
  @media (max-width: 500px) {
    width: 75%;
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
  gap: 5px;

  justify-content: space-between;
  width: 100%;
  flex-direction: column;
`;