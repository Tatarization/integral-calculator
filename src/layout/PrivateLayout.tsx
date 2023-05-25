import {useState, useCallback, FunctionComponent, PropsWithChildren} from 'react';
import {useNavigate} from 'react-router-dom';
import {Stack} from '@mui/material';
import {AppIconButton} from '../components/AppIconButton/AppIconButton';
import ErrorBoundary from '../components/ErrorBoundary';
import {LinkToPage} from '../utils/types';
import {useOnMobile} from '../hooks/layout';
import {SIDEBAR_DESKTOP_ANCHOR, SIDEBAR_WIDTH, TOPBAR_DESKTOP_HEIGHT} from './config';
import {TopBar} from './TopBar/TopBar';
import {SideBar} from './SideBar/SideBar';

const TITLE_PRIVATE = 'Калькулятор интегралов'; // Title for pages after authentication

const SIDEBAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Home',
    path: '/',
    icon: 'home'
  },
  {
    title: 'Profile',
    path: '/user',
    icon: 'account'
  }
];

export const PrivateLayout: FunctionComponent<PropsWithChildren> = ({children}) => {
  const navigation = useNavigate();
  const [sideBarVisible, setSideBarVisible] = useState(false);

  // Variant 2 - Sidebar is drawer on mobile and desktop
  const sidebarOpen = sideBarVisible;
  const sidebarVariant = 'temporary';

  const title = TITLE_PRIVATE;
  document.title = title; // Also Update Tab Title

  const onLogoClick = useCallback(() => {
    // Navigate to first SideBar's item or to '/' when clicking on Logo/Menu icon when SideBar is already visible
    navigation(SIDEBAR_ITEMS?.[0]?.path || '/');
  }, [navigation]);

  const onSideBarOpen = () => {
    if (!sideBarVisible) setSideBarVisible(true); // Don't re-render Layout when SideBar is already open
  };

  const onSideBarClose = () => {
    if (sideBarVisible) setSideBarVisible(false); // Don't re-render Layout when SideBar is already closed
  };

  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '100vh', // Full screen height
        paddingTop: TOPBAR_DESKTOP_HEIGHT,
        paddingLeft: sidebarOpen && SIDEBAR_DESKTOP_ANCHOR.includes('left') ? SIDEBAR_WIDTH : 0,
        paddingRight: sidebarOpen && SIDEBAR_DESKTOP_ANCHOR.includes('right') ? SIDEBAR_WIDTH : 0
      }}
    >
      <Stack component="header">
        <TopBar
          startNode={
            <AppIconButton icon="logo" onClick={sidebarOpen ? onLogoClick : onSideBarOpen} />
          }
          title={title}
        />

        <SideBar
          anchor={SIDEBAR_DESKTOP_ANCHOR}
          open={sidebarOpen}
          variant={sidebarVariant}
          items={SIDEBAR_ITEMS}
          onClose={onSideBarClose}
        />
      </Stack>

      <Stack
        component="main"
        sx={{
          flexGrow: 1, // Takes all possible space
          paddingLeft: 1,
          paddingRight: 1,
          paddingTop: 1
        }}
      >
        <ErrorBoundary name="Content">{children}</ErrorBoundary>
      </Stack>
    </Stack>
  );
};
