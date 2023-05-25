import React, {FC} from 'react';
import {Divider, Grid, Typography} from '@mui/material';
import {MathComponent} from 'mathjax-react';
import {AppButton} from '../../components/AppButton/AppButton';

export interface TableIntegralsCardProps {
  onClick: () => void;
}

export const TableIntegralsCard: FC<TableIntegralsCardProps> = ({onClick}) => {
  // eslint-disable-next-line
  const formula = "F'(x) = f(x)";
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">Неопределенный интеграл</Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="body1">
            Первообразной функции <MathComponent tex="f(x)" display={false} /> на промежутке{' '}
            <MathComponent tex="X" display={false} /> называется дифферециуремая на{' '}
            <MathComponent tex="X" display={false} /> функция{' '}
            <MathComponent tex="F(x)" display={false} />, такая, что для всех{' '}
            <MathComponent tex="x∈X" display={false} /> выполняется равенство{' '}
            <MathComponent tex={formula} display={false} />.
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="body1">
            Совокупность всех первообразных функции
            <MathComponent tex="f(x)" display={false} /> имеет вид{' '}
            <MathComponent tex=" F(x)+C " display={false} />, где{' '}
            <MathComponent tex="C" display={false} /> – произвольная константа, и называется
            неопределенным интегралом функции
            <MathComponent tex="f(x)" display={false} />. Обозначается{' '}
            <MathComponent tex={String.raw`\int f(x)\ dx = F(x) + C`} display={false} />
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" style={{marginTop: 10}}>
        <Grid item xs={12}>
          <Typography variant="h5">Свойства неопределенного интеграла</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" style={{marginTop: 10}}>
            1. <MathComponent tex={String.raw`\int df(x)\ dx = f(x) + C`} display={false} />
          </Typography>
          <Typography variant="h6" style={{marginTop: 10}}>
            2. <MathComponent tex={String.raw`d(\int f(x)\ dx) = f(x)dx`} display={false} />
          </Typography>
          <Typography variant="h6" style={{marginTop: 10}}>
            3. <MathComponent tex={String.raw`\int kf(x)\ dx = k\int f(x)\ dx`} display={false} />
          </Typography>
          <Typography variant="h6" style={{marginTop: 10}}>
            4.{' '}
            <MathComponent
              tex={String.raw`\int (f(x) ± g(x))\ dx = \int f(x)\ dx ± \int g(x)\ dx`}
              display={false}
            />
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="column" style={{marginTop: 10}}>
        <Grid item xs={12}>
          <Typography variant="h5">Таблица интегралов</Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            1. <MathComponent tex={String.raw`\int 0\ dx =  C`} display={false} />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            2. <MathComponent tex={String.raw`\int 1\ dx = x + C`} display={false} />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            3.
            <MathComponent
              tex={String.raw`\int x^n\ dx = \frac{x^{n+1}}{n+1} + C, n ≠ -1`}
              display={false}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            4.
            <MathComponent tex={String.raw`\int \frac{dx}{x} = ln|x| + C`} display={false} />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            5. <MathComponent tex={String.raw`\int e^{x}\ dx = e^{x} + C`} display={false} />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            6.{' '}
            <MathComponent
              tex={String.raw`\int a^{x}\ dx = \frac{a^{x}}{lna} + C`}
              display={false}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            7. <MathComponent tex={String.raw`\int cos{x}\ dx = sin{x} + C`} display={false} />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            8. <MathComponent tex={String.raw`\int sin{x}\ dx = -cos{x} + C`} display={false} />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            9.{' '}
            <MathComponent
              tex={String.raw`\int  \frac{dx}{cos^{2}{x}} = tg{x} + C`}
              display={false}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            10.{' '}
            <MathComponent
              tex={String.raw`\int  \frac{dx}{sin^{2}{x}} = -ctg{x} + C`}
              display={false}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            11.{' '}
            <MathComponent
              tex={String.raw`\int  \frac{dx}{\sqrt{a^{2} - x^{2}}} = arcsin{\frac{x}{a}} + C, |x| <|a|`}
              display={false}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            12.{' '}
            <MathComponent
              tex={String.raw`\int  \frac{dx}{a^{2} + x^{2}} = \frac{1}{a}arctg{\frac{x}{a}} + C`}
              display={false}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            13.{' '}
            <MathComponent
              tex={String.raw`\int  \frac{dx}{a^{2} - x^{2}} = \frac{1}{2a}ln{|\frac{a+x}{a-x}|} + C, |x|≠a`}
              display={false}
            />
          </Typography>
        </Grid>
        <Grid item xs={12} style={{marginTop: 10}}>
          <Typography variant="h6">
            14.{' '}
            <MathComponent
              tex={String.raw`\int  \frac{dx}{\sqrt{x^{2} ± a^{2}}} = ln|x+\sqrt{x^{2} ± a^{2}}| + C`}
              display={false}
            />
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <AppButton color="primary" sx={{mr: 0}} onClick={onClick}>
            Отметить как пройденное
          </AppButton>
        </Grid>
      </Grid>
    </>
  );
};
