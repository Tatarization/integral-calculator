import {localStorageSet} from '../utils/localStorage';
import {Reducer} from 'react';
import {AppStoreState} from './AppStore';

const AppReducer: Reducer<AppStoreState, any> = (state, action) => {
  switch (action.type || action.action) {
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
    case 'CURRENT_USER':
      return {
        ...state,
        currentUser: action?.currentUser || action?.payload
      };
    case 'SIGN_UP':
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticated: true
      };
    case 'LOG_OUT':
      return {
        ...state,
        isAuthenticated: false,
        currentUser: undefined // Also reset previous user data
      };
    default:
      return state;
  }
};

export default AppReducer;
