import { combineReducers } from 'redux';

import siteReducer from './site';
import totalSitesReducer from './totalSites';
import searchResultsReducer from './searchResult';

const rootReducer = combineReducers({
  site: siteReducer,
  totalSites: totalSitesReducer,
  searchResults: searchResultsReducer
});

export default rootReducer;
