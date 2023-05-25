import {FunctionComponent, PropsWithChildren} from 'react';
import {useIsAuthenticated} from '../hooks/auth';
import {PrivateLayout} from './PrivateLayout';
import {Layout} from './Layout';

export const AppLayout: FunctionComponent<PropsWithChildren> = props => {
  return useIsAuthenticated() ? <Layout {...props} /> : <PrivateLayout {...props} />;
};
