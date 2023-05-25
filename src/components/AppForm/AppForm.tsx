import {ReactNode, FormHTMLAttributes, FunctionComponent} from 'react';
import {Box, Grid} from '@mui/material';

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const AppForm: FunctionComponent<Props> = ({children, ...resOfProps}) => {
  return (
    <form {...resOfProps}>
      <Grid container direction="column" alignItems="center">
        <Box maxWidth="40rem" width="100%">
          {children}
        </Box>
      </Grid>
    </form>
  );
};
