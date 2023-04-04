import createCache from '@emotion/cache';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {FunctionComponent, useMemo, PropsWithChildren} from 'react';
import {useAppStore} from '../store';
import {DARK_THEME, LIGHT_THEME} from './colors';

function createEmotionCache() {
  return createCache({key: 'css', prepend: true});
}

const CLIENT_SIDE_EMOTION_CACHE = createEmotionCache();

interface Props extends PropsWithChildren {
  emotionCache?: EmotionCache;
}

const AppThemeProvider: FunctionComponent<Props> = ({
  children,
  emotionCache = CLIENT_SIDE_EMOTION_CACHE
}) => {
  const [state] = useAppStore();
  const theme = useMemo(
    () => (state.darkMode ? createTheme(DARK_THEME) : createTheme(LIGHT_THEME)),
    [state.darkMode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default AppThemeProvider;
