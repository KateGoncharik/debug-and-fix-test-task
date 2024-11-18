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

const getInitSearchParamValue = (searchParamName, initSearchParams) => {
  if (searchParamName === 'page') {
    const pageNumberFromURL = +initSearchParams.get(searchParamName);

    if (isNaN(pageNumberFromURL) || pageNumberFromURL < firstPageNumber) {
      return firstPageNumber;
    }
    return pageNumberFromURL;
  }
  return initSearchParams.get(searchParamName) ?? '';
};

export function CharactersProvider({ children }) {
  const initSearchParams = new URLSearchParams(document.location.search);

  const initPage = getInitSearchParamValue('page', initSearchParams);
  const [activePage, setActivePage] = useState(initPage);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const [filters, setFilters] = useState({
    name: getInitSearchParamValue('name', initSearchParams),
    status: getInitSearchParamValue('status', initSearchParams),
    species: getInitSearchParamValue('species', initSearchParams),
    type: getInitSearchParamValue('type', initSearchParams),
    gender: getInitSearchParamValue('gender', initSearchParams)
  });

  const resetActivePage = () => {
    setActivePage(firstPageNumber);
  };

  useEffect(() => {
    const syncStateWithURL = () => {
      const searchParams = new URLSearchParams(window.location.search);

      const newFilters = {
        name: searchParams.get('name') || '',
        status: searchParams.get('status') || '',
        species: searchParams.get('species') || '',
        type: searchParams.get('type') || '',
        gender: searchParams.get('gender') || ''
      };

      const newPage = +searchParams.get('page') || firstPageNumber;

      setFilters((prev) =>
        JSON.stringify(prev) !== JSON.stringify(newFilters) ? newFilters : prev
      );
      setActivePage((prev) => (prev !== newPage ? newPage : prev));
    };

    window.addEventListener('popstate', syncStateWithURL);

    syncStateWithURL();

    return () => window.removeEventListener('popstate', syncStateWithURL);
  }, []);

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
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });
    searchParams.set('page', activePage.toString());

    const newUrl = `?${searchParams.toString()}`;
    if (window.location.search !== newUrl) {
      window.history.pushState({}, '', newUrl);
    }

    fetchCharacters(filters, activePage);
  }, [filters, activePage, fetchCharacters]);

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
