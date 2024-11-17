import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useCharacters } from './providers';

export const firstPageNumber = 1;

export function Pagination() {
  const [pages, setPages] = useState([]);
  const {
    apiURL,
    info,
    activePage,
    setActivePage,
    setApiURL
  } = useCharacters();

  const pageClickHandler = (newPageIndex) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(newPageIndex);
    if (newPageIndex === pages.length) {
      setApiURL(pages[newPageIndex - 1]);
    } else {
      setApiURL(pages[newPageIndex]);
    }
  };

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);

      URLWithPage.searchParams.set('page', i + 1);
      return URLWithPage;
    });

    setPages(createdPages);
  }, [apiURL, info]);

  if (pages.length < 1) return null;

  const isTherePreviousPage = pages[activePage - 2];
  const isThereNextPage = pages[activePage];
  const isActivePageNotFirst = activePage !== firstPageNumber;
  const isActivePageNotLast = activePage !== pages.length - 1;
  return (
    <StyledPagination>
      {isTherePreviousPage && (
        <>
          {isActivePageNotFirst && (
            <>
              <Page onClick={() => pageClickHandler(firstPageNumber)}>
                « First
              </Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}

          <Page onClick={() => pageClickHandler(activePage - 1)}>
            {activePage - 1}
          </Page>
        </>
      )}

      <Page active>{activePage}</Page>

      {isThereNextPage && (
        <>
          <Page onClick={() => pageClickHandler(activePage + 1)}>
            {activePage + 1}
          </Page>

          {isActivePageNotLast && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={() => pageClickHandler(pages.length)}>Last »</Page>
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
