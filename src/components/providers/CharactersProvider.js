import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

const buildQueryString = (params) => {
  const result = [];
  for (const [key, value] of params) {
    const query = `${key}=${value}`;
    result.push(query);
  }
  return `?${result.join('&')}`;
};

export function CharactersProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const fetchData = async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  };

  // TODO we cannot use popstate handler

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const allSearchParams = searchParams.entries();
    if (searchParams.size > 0) {
      const filtersQueryString = buildQueryString(allSearchParams);
      fetchData(apiURL + filtersQueryString);
    } else {
      fetchData(apiURL);
    }
  }, [apiURL]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      isError,
      info
    }),
    [activePage, apiURL, characters, isFetching, isError, info]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useCharacters = () => useContext(DataContext);
