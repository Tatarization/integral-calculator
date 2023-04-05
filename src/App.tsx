import {AppStore} from './store';
import AppThemeProvider from './theme/AppThemeProvider';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import {Layout} from './layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <div>
      <ErrorBoundary name="App">
        <AppStore>
          <AppThemeProvider>
            <BrowserRouter>
              <Layout>
                <Routes />
              </Layout>
            </BrowserRouter>
          </AppThemeProvider>
        </AppStore>
      </ErrorBoundary>
    </div>
  );
};

export default App;
