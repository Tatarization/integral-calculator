import React, {FC} from 'react';
import {Grid, Typography} from '@mui/material';
import {MathComponent} from 'mathjax-react';
import {AppButton} from '../AppButton/AppButton';

export interface PracticeCardProps {
  onClick: () => void;
}

export const Practice: FC<PracticeCardProps> = ({onClick}) => {
  return (
    <div>
      <Typography variant="h5">Пример нахождения первообразных</Typography>
      <Grid container direction="column" alignContent="center">
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            Пример 1.{' '}
            <MathComponent
              tex={String.raw`\int  (3x^{2} - x^{\frac{1}{3}} + \frac{1}{x^{3}})\ dx`}
              display={false}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="body1">
            Решение. Применим теорему об арифметике интегралов (интеграл от суммы функций равен
            сумме интегралов, числовой множитель можно вынести за знак интеграла)
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            <MathComponent
              tex={String.raw`\int  (3x^{2} - x^{\frac{1}{3}} + \frac{1}{x^{3}})\ dx = 3 \int x^{3} \ dx - \int x^{\frac{1}{3}} \ dx + \int \frac{\ dx}{x^{3}} =`}
              display={true}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="body1">
            Воспользуемся таблицей интегралов (в данном случае формулой первообразной степенной
            функции для показателей{' '}
            <MathComponent tex={String.raw`n = 3, n = \frac{1}{3}, n= -3:`} display={false} />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            <MathComponent
              tex={String.raw`= 3 \frac{x^{3+1}}{3+ 1} - \frac{x^{\frac{1}{3} + 1}}{\frac{1}{3} + 1} + \frac{x^{-3 + 1}}{-3 + 1} = 3 \frac{x^{4}}{4} - \frac{3}{4}x^{\frac{4}{3}} - \frac{1}{2x^{2}} + C`}
              display={true}
            />
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <AppButton color="primary" sx={{mr: 0}} onClick={onClick}>
            Отметить как пройденное
          </AppButton>
        </Grid>
      </Grid>
    </div>
  );
};
