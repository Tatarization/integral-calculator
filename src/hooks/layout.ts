import {useMediaQuery, useTheme} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';

export function useOnMobileByTrackingWindowsResize() {
  const theme = useTheme();
  const [onMobile, setOnMobile] = useState(false);

  const handleResize = useCallback(() => {
    setOnMobile(window.innerWidth < theme.breakpoints.values.sm); // sx, sm are "onMobile"
  }, [theme.breakpoints.values.sm]);

  useEffect(() => {
    window.addEventListener('resize', handleResize); // Set resize listener

    return () => {
      window.removeEventListener('resize', handleResize); // Remove resize listener
    };
  }, [handleResize]);

  return onMobile;
}

export function useOnMobileByMediaQuery() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
}

export const useOnMobile = useOnMobileByMediaQuery;

export function useOnWideScreen() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'));
}
