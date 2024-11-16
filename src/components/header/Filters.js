import { useState } from 'react';
import styled from 'styled-components';

import { useCharacters } from '../providers';
import { FiltersMenu } from './FiltersMenu';

export function Filters() {
  const { filters, setFilters, resetActivePage } = useCharacters();

  const defaultFiltersMenuSettings = {
    visible: false
  };

  const [filtersMenuSettings, setFiltersMenuSettings] = useState(
    defaultFiltersMenuSettings
  );

  function handleOpenFilters() {
    setFiltersMenuSettings({
      visible: true
    });
  }

  return (
    <FiltersWrapper>
      <FiltersContainer>
        <ToggleButton
          onClick={() => {
            handleOpenFilters();
          }}
        >
          {filtersMenuSettings.visible ? 'Hide Filters' : 'Show Filters'}
        </ToggleButton>

        <FiltersMenu
          settings={filtersMenuSettings}
          setSettings={setFiltersMenuSettings}
          filters={filters}
          resetActivePage={resetActivePage}
          setFilters={setFilters}
        />
      </FiltersContainer>
    </FiltersWrapper>
  );
}

const ToggleButton = styled.button`
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

const FiltersContainer = styled.div`
  width: 100%;
  display: flex;

  justify-content: flex-end;
`;

const FiltersWrapper = styled.div`
  width: 100%;
`;
