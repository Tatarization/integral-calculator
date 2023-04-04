import React, {FunctionComponent, PropsWithChildren, useCallback, useState} from 'react';
import {Stack} from '@mui/material/';
import {useAppStore} from '../store';
import ErrorBoundary from '../components/ErrorBoundary';
import {LinkToPage} from '../utils/types';
import {TOPBAR_DESKTOP_HEIGHT} from './config';
import {useEventSwitchDarkMode} from '../hooks/useEventSwitchDarkMode';
import {TopBar} from './TopBar/TopBar';
import {SideBar} from './SideBar/SideBar';
import {AppIconButton} from '../components/AppIconButton/AppIconButton';

const TITLE_PUBLIC = 'Христианский Калькулятор Интегралов'; // Title for pages without/before authentication

const SIDEBAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Главная',
    path: '/',
    icon: 'home'
  },
  {
    title: 'Обучение',
    path: '/learning',
    icon: 'learning'
  },
  {
    title: 'Дополнительная информация',
    path: '/about',
    icon: 'info'
  }
];

export const Layout: FunctionComponent<PropsWithChildren> = ({children}) => {
  const onSwitchDarkMode = useEventSwitchDarkMode();
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [state] = useAppStore();
  const sidebarOpen = sideBarVisible;
  const sidebarVariant = 'permanent';

  const onSideBarOpen = useCallback(() => {
    if (!sideBarVisible) setSideBarVisible(true); // Don't re-render Layout when SideBar is already open
  }, [sideBarVisible]);

  const onSideBarClose = useCallback(() => {
    if (sideBarVisible) setSideBarVisible(false); // Don't re-render Layout when SideBar is already closed
  }, [sideBarVisible]);

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        paddingTop: TOPBAR_DESKTOP_HEIGHT
      }}
    >
      <Stack component="header">
        <TopBar
          startNode={<AppIconButton icon="logo" onClick={onSideBarOpen} />}
          title={TITLE_PUBLIC}
          endNode={
            <AppIconButton
              icon="daynight"
              title={state.darkMode ? 'Переключить на Светлую тему' : 'Переключить на Темную тему'}
              onClick={onSwitchDarkMode}
            />
          }
        />

        <SideBar
          anchor="left"
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
          padding: 1
        }}
      >
        <ErrorBoundary name="Content">{children}</ErrorBoundary>
      </Stack>
    </Stack>
  );
};
