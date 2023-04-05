import {FC, PropsWithChildren} from 'react';
import {Stack} from '@mui/material';
import {AppIconButton} from '../components/AppIconButton/AppIconButton';
import ErrorBoundary from '../components/ErrorBoundary';
import {LinkToPage} from '../utils/types';
import {SIDEBAR_WIDTH, TOPBAR_DESKTOP_HEIGHT} from './config';
import {TopBar} from './TopBar/TopBar';
import {SideBar} from './SideBar/SideBar';

const TITLE_PRIVATE = 'Калькулятор Интегралов'; // Title for pages after authentication

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

export const Layout: FC<PropsWithChildren> = ({children}) => {
  const title = TITLE_PRIVATE;
  document.title = title; // Also Update Tab Title

  return (
    <Stack
      direction="column"
      sx={{
        minHeight: '100vh', // Full screen height
        paddingTop: TOPBAR_DESKTOP_HEIGHT,
        paddingLeft: SIDEBAR_WIDTH
      }}
    >
      <Stack component="header">
        <TopBar startNode={<AppIconButton icon="logo" />} title={title} />
        <SideBar anchor="left" open={true} variant="persistent" items={SIDEBAR_ITEMS} />
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
