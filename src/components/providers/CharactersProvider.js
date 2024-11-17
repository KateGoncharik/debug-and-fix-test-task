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
      const pageFromURL = +initSearchParams.get(searchParamName);

      if (isNaN(pageFromURL) || pageFromURL < 1) {
        return firstPageNumber;
      }
      return pageFromURL ?? firstPageNumber;
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

      const newUrl = `${API_URL}?${searchParams.toString()}`;
      window.history.pushState({}, '', `?${searchParams.toString()}`);

      setApiURL(newUrl);
    },
    [activePage]
  );

  const fetchData = async (filters, page) => {
    setIsFetching(true);
    setIsError(false);

    const searchParams = new URLSearchParams(filters);
    searchParams.set('page', page.toString());

    axios
      .get(`${API_URL}?${searchParams.toString()}`)
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

  useEffect(() => {
    fetchData(filters, activePage);
    updateUrl(filters, activePage);
  }, [filters, activePage, updateUrl]);

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
