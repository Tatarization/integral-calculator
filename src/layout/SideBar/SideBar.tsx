import {FunctionComponent, useCallback, MouseEvent} from 'react';
import {
  Stack,
  Divider,
  Drawer,
  DrawerProps,
  FormControlLabel,
  Switch,
  Tooltip
} from '@mui/material';
import {useAppStore} from '../../store';
import {SIDEBAR_WIDTH, TOPBAR_DESKTOP_HEIGHT} from '../config';
import {LinkToPage} from '../../utils/types';
import {SideBarNavList} from './SideBarNavList';
import {useEventSwitchDarkMode} from '../../hooks/useEventSwitchDarkMode';

interface Props extends Pick<DrawerProps, 'anchor' | 'className' | 'open' | 'variant' | 'onClose'> {
  items: Array<LinkToPage>;
}

export const SideBar: FunctionComponent<Props> = ({
  anchor,
  open,
  variant,
  items,
  onClose,
  ...restOfProps
}) => {
  const [state] = useAppStore();

  const onSwitchDarkMode = useEventSwitchDarkMode();

  const handleAfterLinkClick = useCallback(
    (event: MouseEvent) => {
      if (variant === 'temporary' && typeof onClose === 'function') {
        onClose(event, 'backdropClick');
      }
    },
    [variant, onClose]
  );

  return (
    <Drawer
      anchor={anchor}
      open={open}
      variant={variant}
      PaperProps={{
        sx: {
          width: SIDEBAR_WIDTH,
          marginTop: variant === 'temporary' ? 0 : TOPBAR_DESKTOP_HEIGHT,
          height: variant === 'temporary' ? '100%' : `calc(100% - ${TOPBAR_DESKTOP_HEIGHT})`
        }
      }}
      onClose={onClose}
    >
      <Stack
        sx={{
          height: '100%',
          padding: 2
        }}
        {...restOfProps}
        onClick={handleAfterLinkClick}
      >
        <SideBarNavList items={items} showIcons />

        <Divider />

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 2
          }}
        >
          <Tooltip
            title={state.darkMode ? 'Переключить на Светлую тему' : 'Переключить на Темную тему'}
          >
            <FormControlLabel
              label={!state.darkMode ? 'Светлая тема' : 'Темная тема'}
              control={<Switch checked={state.darkMode} onChange={onSwitchDarkMode} />}
            />
          </Tooltip>
        </Stack>
      </Stack>
    </Drawer>
  );
};
