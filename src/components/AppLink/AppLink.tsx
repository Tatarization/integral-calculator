import {forwardRef, ReactNode} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import MuiLink, {LinkProps as MuiLinkProps} from '@mui/material/Link';
import {APP_LINK_COLOR, APP_LINK_UNDERLINE} from '../config';

interface Props extends MuiLinkProps {
  children: ReactNode;
  to?: string;
  href?: string;
  openInNewTab?: boolean;
}

export const AppLink = forwardRef<any, Props>(
  (
    {
      children,
      color = APP_LINK_COLOR,
      underline = APP_LINK_UNDERLINE,
      to = '',
      href,
      openInNewTab = Boolean(href), // Open external links in new Tab by default
      ...restOfProps
    },
    ref
  ) => {
    const propsToRender = {
      color,
      underline,
      ...(openInNewTab ? {target: '_blank', rel: 'noreferrer noopener'} : {}),
      ...restOfProps
    };
    return href ? (
      <MuiLink ref={ref} href={href} {...propsToRender}>
        {children}
      </MuiLink>
    ) : (
      <MuiLink ref={ref} component={RouterLink} to={to as string} {...propsToRender}>
        {children}
      </MuiLink>
    );
  }
);

AppLink.displayName = 'AppLink';
