import {
  createContext,
  useReducer,
  useContext,
  FunctionComponent,
  Dispatch,
  ComponentType,
  PropsWithChildren
} from 'react';
import AppReducer from './AppReducer';
import {localStorageGet} from '../utils/localStorage';

export interface AppStoreState {
  darkMode: boolean;
  isAuthenticated: boolean;
  currentUser?: object | undefined;
}
const INITIAL_APP_STATE: AppStoreState = {
  darkMode: true,
  isAuthenticated: false
};

type AppContextReturningType = [AppStoreState, Dispatch<any>];
const AppContext = createContext<AppContextReturningType>([INITIAL_APP_STATE, () => null]);

const AppStoreProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const previousDarkMode = Boolean(localStorageGet('darkMode'));
  // const tokenExists = Boolean(loadToken());

  const initialState: AppStoreState = {
    ...INITIAL_APP_STATE,
    darkMode: previousDarkMode
  };
  const value: AppContextReturningType = useReducer(AppReducer, initialState);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppStore = (): AppContextReturningType => useContext(AppContext);

interface WithAppStoreProps {
  store: object;
}
const withAppStore =
  (Component: ComponentType<WithAppStoreProps>): FunctionComponent =>
  // eslint-disable-next-line react/display-name
  props => {
    return <Component {...props} store={useAppStore()} />;
  };
withAppStore.displayName = 'withAppStore';

export {AppStoreProvider as AppStore, AppContext, useAppStore, withAppStore};
