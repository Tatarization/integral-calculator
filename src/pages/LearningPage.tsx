import React from 'react';
import {Grid, Typography} from '@mui/material';
import {LearningCardList} from '../components/learning/LearningCardList';

export const LearningPage = () => {
  return (
    <Grid container style={{marginLeft: 35}}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{mb: 5}}>
          Курсы
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LearningCardList />
      </Grid>
    </Grid>
  );
};
