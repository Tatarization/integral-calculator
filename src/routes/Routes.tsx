import AppRoutes from './AppRoutes';
import PublicRoutes from './PublicRoutes';
import {useIsAuthenticated} from '../hooks/auth';

export const Routes = () => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <AppRoutes /> : <PublicRoutes />;
};
