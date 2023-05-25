import {Card, Typography, CardActionArea, CardContent, IconButton, Grid} from '@mui/material';
import {FC} from 'react';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {AppLink} from '../AppLink/AppLink';

export interface LearningCardProps {
  id: number;
  name: string;
  status?: string;
  description: string;
}
const PRODUCT_COLOR = ['rgb(34,227,185)', 'rgb(249,215,130)'];

export const LearningCard: FC<LearningCardProps> = ({name, status, description, id}) => {
  return (
    <Card
      sx={{
        minWidth: 420,
        maxWidth: 420,
        minHeight: 190,
        maxHeight: 190,
        border: '1px solid rgba(211,211,211,0.6)',
        borderRadius: 5,
        background: PRODUCT_COLOR[status === 'Пройдено' ? 0 : 1]
      }}
    >
      <CardActionArea>
        <AppLink to={`/learning/card/${id}`}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </AppLink>
      </CardActionArea>
      <Grid container>
        <Grid item xs={1}>
          <IconButton aria-label="check">
            {status === 'Пройдено' ? <Check /> : <CloseIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={11} style={{marginTop: 10}}>
          <Typography>{status}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
