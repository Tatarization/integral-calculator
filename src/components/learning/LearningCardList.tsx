import {Grid} from '@mui/material';
import {courses} from '../../_mock/courses';
import {LearningCard} from './LearningCard';

export const LearningCardList = () => {
  return (
    <Grid container spacing={2}>
      {courses.map(product => (
        <Grid key={product.id} item>
          <LearningCard
            name={product.name}
            status={product.status!}
            description={product.description}
            id={product.id}
          />
        </Grid>
      ))}
    </Grid>
  );
};
