import {localStorageSet} from '../utils/localStorage';
import {Reducer} from 'react';
import {AppStoreState} from './AppStore';

const AppReducer: Reducer<AppStoreState, any> = (state, action) => {
  switch (action.type) {
    case 'DARK_MODE': {
      const darkMode = action?.darkMode ?? action?.payload;
      localStorageSet('darkMode', darkMode);
      return {
        ...state,
        darkMode
      };
    }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default AppReducer;
