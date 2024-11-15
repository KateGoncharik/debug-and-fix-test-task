import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useCharacters } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const {
    apiURL,
    info,
    activePage,
    setActivePage,
    setApiURL
  } = useCharacters();

  const pageClickHandler = (index) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(index);
    setApiURL(pages[index]);
  };

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);

      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [apiURL, info]);

  if (pages.length <= 1) return null;

  const isTherePreviousPage = pages[activePage - 1];
  const isThereNextPage = pages[activePage + 1];
  const isActivePageNotFirst = activePage - 1 !== 0;
  const isActivePageNotLast = activePage + 1 !== pages.length - 1;

  return (
    <StyledPagination>
      {isTherePreviousPage && (
        <>
          {isActivePageNotFirst && (
            <>
              <Page onClick={() => pageClickHandler(0)}>« First</Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}

          <Page onClick={() => pageClickHandler(activePage - 1)}>
            {activePage}
          </Page>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {isThereNextPage && (
        <>
          <Page onClick={() => pageClickHandler(activePage + 1)}>
            {activePage + 2}
          </Page>

          {isActivePageNotLast && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={() => pageClickHandler(pages.length - 1)}>
                Last »
              </Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
