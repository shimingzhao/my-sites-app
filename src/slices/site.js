import { createSlice } from '@reduxjs/toolkit';
import { siteUrl } from '../appConfig';

export const initialState = {
  loading: true,
  hasErrors: false,
  site: {},
}

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    getSite: state => {
      state.loading = true
    },
    getSiteSuccess: (state, { payload }) => {
      state.site = payload
      state.loading = false
      state.hasErrors = false
    },
    getSiteFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getSite, getSiteSuccess, getSiteFailure } = siteSlice.actions;
export const siteSelector = state => state.site;
export default siteSlice.reducer;

export function fetchSite(id) {
  return async dispatch => {
    dispatch(getSite());

    try {
      const response = await fetch(`${siteUrl}${id}`);
      const data = await response.json();
      dispatch(getSiteSuccess(data));
    } catch (error) {
      dispatch(getSiteFailure());
    }
  }
}
