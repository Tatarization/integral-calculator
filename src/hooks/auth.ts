import {useCallback} from 'react';
import {useAppStore} from '../store';

export function useIsAuthenticated() {
  const [state] = useAppStore();
  const result = state.isAuthenticated;

  return result;
}

export function useEventLogout() {
  const [, dispatch] = useAppStore();

  return useCallback(() => {
    dispatch({type: 'LOG_OUT'});
  }, [dispatch]);
}
