import {AppStore} from './store';
import AppThemeProvider from './theme/AppThemeProvider';
import {BrowserRouter} from 'react-router-dom';
import {Routes} from './routes/Routes';
import {AppLayout} from './layout/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';

export const App = () => {
  return (
    <div>
      <ErrorBoundary name="App">
        <AppStore>
          <AppThemeProvider>
            <BrowserRouter>
              <AppLayout>
                <Routes />
              </AppLayout>
            </BrowserRouter>
          </AppThemeProvider>
        </AppStore>
      </ErrorBoundary>
    </div>
  );
};

export default App;
