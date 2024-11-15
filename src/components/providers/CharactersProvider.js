import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function CharactersProvider({ children }) {
  // TODO can we set it as 1?
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  // we need to handle both typed in url filters and passed from input !
  // we need to reset page on new filters +

  // inputs values are applied to url +

  // we store search params in provider +
  // we pass params values and setter for values to filters component +
  // in filters component we pass input values to state +

  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });

  const resetActivePage = () => {
    setActivePage(0);
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
