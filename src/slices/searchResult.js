import { createSlice } from '@reduxjs/toolkit';
import { searchSitesUrl } from '../appConfig';

export const initialState = {
    loading: false,
    hasErrors: false,
    searchResults: [],
}

const searchResultsSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        getSearchResults: state => {
            state.loading = true;
        },
        getSearchResultsSuccess: (state, { payload }) => {
            state.searchResults = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getSearchResultsFailure: state => {
            state.loading = false;
            state.hasErrors = true;
        },
    },
})

export const { getSearchResults, getSearchResultsSuccess, getSearchResultsFailure } = searchResultsSlice.actions;
export const searchResultsSelector = state => state.searchResults;
export default searchResultsSlice.reducer;

export function fetchSearchResults(title) {
    return async dispatch => {
        dispatch(getSearchResults());

        try {
            const response = await fetch(`${searchSitesUrl}${title}`);
            const data = await response.json();
            dispatch(getSearchResultsSuccess(data));
        } catch (error) {
            dispatch(getSearchResultsFailure());
        }
    }
}