import {ElementType, FunctionComponent, useMemo} from 'react';
import {Tooltip, IconButton, IconButtonProps, alpha} from '@mui/material';
import {AppIcon} from '../AppIcon/AppIcon';
import {AppLink} from '../AppLink/AppLink';

const MUI_ICON_BUTTON_COLORS = [
  'inherit',
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning'
];

interface Props extends Omit<IconButtonProps, 'color'> {
  color?: string;
  icon?: string;
  component?: ElementType;
  to?: string;
  href?: string;
  openInNewTab?: boolean;
}

export const AppIconButton: FunctionComponent<Props> = ({
  color = 'default',
  component,
  children,
  disabled,
  icon,
  sx,
  title,
  ...restOfProps
}) => {
  const componentToRender =
    !component && (restOfProps?.href || restOfProps?.to) ? AppLink : component ?? IconButton;

  const isMuiColor = useMemo(() => MUI_ICON_BUTTON_COLORS.includes(color), [color]);

  const IconButtonToRender = useMemo(() => {
    const colorToRender = isMuiColor ? (color as IconButtonProps['color']) : 'default';
    const sxToRender = {
      ...sx,
      ...(isMuiColor
        ? {}
        : {
            'color': color,
            ':hover': {
              backgroundColor: alpha(color, 0.04)
            }
          })
    };
    return (
      <IconButton
        component={componentToRender}
        color={colorToRender}
        disabled={disabled}
        sx={sxToRender}
        {...restOfProps}
      >
        <AppIcon icon={icon} />
        {children}
      </IconButton>
    );
  }, [color, componentToRender, children, disabled, icon, isMuiColor, sx, restOfProps]);

  return title && !disabled ? (
    <Tooltip title={title}>{IconButtonToRender}</Tooltip>
  ) : (
    IconButtonToRender
  );
};
