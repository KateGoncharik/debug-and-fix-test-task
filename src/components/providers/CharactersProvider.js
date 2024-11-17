import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { firstPageNumber } from '../Pagination';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function CharactersProvider({ children }) {
  const initSearchParams = new URLSearchParams(document.location.search);

  const getInitSearchParamValue = (searchParamName) => {
    if (searchParamName === 'page') {
      const pageNumberFromURL = +initSearchParams.get(searchParamName);

      if (isNaN(pageNumberFromURL) || pageNumberFromURL < firstPageNumber) {
        return firstPageNumber;
      }
      return pageNumberFromURL;
    }
    return initSearchParams.get(searchParamName) ?? '';
  };
  const initPage = getInitSearchParamValue('page');
  const [activePage, setActivePage] = useState(initPage);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const [filters, setFilters] = useState({
    name: getInitSearchParamValue('name'),
    status: getInitSearchParamValue('status'),
    species: getInitSearchParamValue('species'),
    type: getInitSearchParamValue('type'),
    gender: getInitSearchParamValue('gender')
  });

  const resetActivePage = () => {
    setActivePage(firstPageNumber);
  };

  const updateUrl = useCallback(
    (newFilters, page = activePage) => {
      const searchParams = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          searchParams.set(key, value);
        }
      });

      searchParams.set('page', page.toString());
      window.history.pushState({}, '', `?${searchParams.toString()}`);
    },
    [activePage]
  );

  const fetchCharacters = useCallback(async (filters, page) => {
    setIsFetching(true);
    setIsError(false);

    const searchParams = new URLSearchParams(filters);
    searchParams.set('page', page.toString());

    axios
      .get(`${API_URL}?${searchParams.toString()}`)

      .then(({ data: characters }) => {
        setIsFetching(false);
        setCharacters(characters.results);
        setInfo(characters.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  }, []);

  useEffect(() => {
    fetchCharacters(filters, activePage);
    updateUrl(filters, activePage);
  }, [filters, activePage, updateUrl, fetchCharacters]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      isError,
      filters,
      setFilters,
      resetActivePage,
      info
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      filters,
      setFilters
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useCharacters = () => useContext(DataContext);
