import React from 'react';
import {Grid, Typography} from '@mui/material';
import {MathComponent} from 'mathjax-react';

export const IntegralIntroductionPage = () => {
  // eslint-disable-next-line
  const formula = "F'(x) = f(x)";
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Неопределенный интеграл</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Первообразной функции <MathComponent tex="f(x)" display={false} /> на промежутке{' '}
          <MathComponent tex="X" display={false} /> называется дифферециуремая на{' '}
          <MathComponent tex="X" display={false} /> функция{' '}
          <MathComponent tex="F(x)" display={false} />, такая, что для всех{' '}
          <MathComponent tex="x∈X" display={false} /> выполняется равенство{' '}
          <MathComponent tex={formula} display={false} />.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Совокупность всех первообразных функции
          <MathComponent tex="f(x)" display={false} /> имеет вид
          <MathComponent tex="F(x)+C" display={false} />, где
          <MathComponent tex="C" display={false} /> – произвольная константа, и называется
          неопределенным интегралом функции
          <MathComponent tex="f(x)" display={false} />. Обозначается{' '}
          <MathComponent tex={String.raw`\int f(x)\ dx = F(x) + C`} display={false} />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Свойства неопределенного интеграла</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          1) <MathComponent tex={String.raw`\int df(x)\ dx = f(x) + C`} display={false} />
        </Typography>
        <Typography variant="body1">
          2) <MathComponent tex={String.raw`d(\int f(x)\ dx) = f(x)dx`} display={false} />
        </Typography>
        <Typography variant="body1">
          3) <MathComponent tex={String.raw`\int kf(x)\ dx = k\int f(x)\ dx`} display={false} />
        </Typography>
        <Typography variant="body1">
          4){' '}
          <MathComponent
            tex={String.raw`\int (f(x) ± g(x))\ dx = \int f(x)\ dx ± \int g(x)\ dx`}
            display={false}
          />
        </Typography>
      </Grid>
    </Grid>
  );
};
