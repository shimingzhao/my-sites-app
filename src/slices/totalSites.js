import { createSlice } from '@reduxjs/toolkit';
import { totalSitesUrl } from '../appConfig';

export const initialState = {
    loading: true,
    hasErrors: false,
    totalSites: [],
}

const totalSitesSlice = createSlice({
    name: 'totalSites',
    initialState,
    reducers: {
        getTotalSites: state => {
            state.loading = true;
        },
        getTotalSitesSuccess: (state, { payload }) => {
            state.totalSites = payload;
            state.loading = false;
            state.hasErrors = false;
        },
        getTotalSitesFailure: state => {
            state.loading = false;
            state.hasErrors = true;
        },
    },
})

export const { getTotalSites, getTotalSitesSuccess, getTotalSitesFailure } = totalSitesSlice.actions;
export const totalSitesSelector = state => state.totalSites;
export default totalSitesSlice.reducer;

export function fetchTotalSites() {
    return async dispatch => {
        dispatch(getTotalSites());

        try {
            const response = await fetch(totalSitesUrl);
            const data = await response.json();
            dispatch(getTotalSitesSuccess(data));
        } catch (error) {
            dispatch(getTotalSitesFailure());
        }
    }
}