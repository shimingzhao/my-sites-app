import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar, Icon, Pagination, SearchBar, Button } from 'antd-mobile';
import { Site } from '../components/site';
import { fetchTotalSites, totalSitesSelector } from '../slices/totalSites';
import { fetchSearchResults, searchResultsSelector } from '../slices/searchResult';
import { pageSize } from '../appConfig';

const useConstructor = (callBack = () => { }) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
}

export const SitesPage = () => {
  const [pageState, changePage] = useState({ current: 1, minIndex: 0, maxIndex: pageSize });
  const [searchState, updateSearchState] = useState({ showSearchBar: false, searchInput: "", isOnSearching: false });

  const dispatch = useDispatch();

  const { totalSites, loading: totalSitesLoading, hasErrors: totalSitesHasError } = useSelector(totalSitesSelector);
  const { searchResults, loading: searchResultsLoading, hasErrors: searchResultsHasError } = useSelector(searchResultsSelector);
  const { showSearchBar, isOnSearching, searchInput } = searchState;

  useConstructor(() => {
    dispatch(fetchTotalSites());
  });

  useEffect(() => {
    if (searchState.isOnSearching) {
      dispatch(fetchSearchResults(searchState.searchInput));
    }
    else {
      dispatch(fetchTotalSites());
    }
  }, [dispatch, searchState.isOnSearching, searchState.searchInput]);

  const onSearchIconClickHandle = (e) => {
    e.preventDefault();// Fix event propagation on Android

    updateSearchState(prevState => {
      return { ...prevState, showSearchBar: true };
    });
  };

  const onBlurSearchBarHandle = () => {
    updateSearchState(prevState => {
      return { ...prevState, showSearchBar: false };
    });
  };

  const onCancelSearchHandle = () => {
    updateSearchState(() => {
      return { showSearchBar: false, searchInput: "", isOnSearching: false };
    });
  };

  const searchSubmitHandle = (val) => {
    updateSearchState(() => {
      return { showSearchBar: false, searchInput: val, isOnSearching: true };
    });
  };

  const onPageChangeHandle = (page) => {
    changePage(() => {
      return { current: page, minIndex: (page - 1) * pageSize, maxIndex: page * pageSize }
    });
  }

  const renderSites = () => {
    if (totalSitesLoading) return <p>Loading sites...</p>;
    if (totalSitesHasError) return <p>Unable to display sites.</p>;

    if (searchResultsLoading) return <p>Loading results...</p>;
    if (searchResultsHasError) return <p>Unable to display the results.</p>;

    return sites?.map((site, index) => index >= pageState.minIndex &&
      index < pageState.maxIndex && (<Site key={site.id} site={site} />));
  };

  const renderPaginator = () => {
    const totalPage = Math.ceil(sites.length / pageSize);

    return <Pagination
      total={totalPage}
      className="custom-pagination-with-icon"
      current={pageState.current}
      locale={{
        prevText: (
          <span className="arrow-align"><Icon type="left" />Prev</span>
        ),
        nextText: (
          <span className="arrow-align">Next<Icon type="right" /></span>
        ),
      }}
      onChange={onPageChangeHandle}
    />
  };

  const renderSearchBar = () => {
    return <SearchBar placeholder={isOnSearching ? searchInput : "Search by title"} maxLength={30} onCancel={onCancelSearchHandle} cancelText="Cancel" onSubmit={searchSubmitHandle} onBlur={onBlurSearchBarHandle} defaultValue={searchInput} />
  }

  const sites = isOnSearching ? searchResults : totalSites;

  return (
    <div style={{ borderTop: '0.5px solid #FFF' }}>
      <NavBar
        mode="dark"
        rightContent={[
          isOnSearching ? <Button key="0" type="primary" size="small" inline onClick={onCancelSearchHandle}>Clear</Button> : null,
          <Icon key="1" type="search" style={{ marginRight: '16px' }} onClick={onSearchIconClickHandle} />,
        ]}
      >
        Sites
      </NavBar>
      {showSearchBar ? renderSearchBar() : null}
      {renderSites()}
      {renderPaginator()}
    </div>
  );
};