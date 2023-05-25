import React, {FC, useState} from 'react';
import {FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography} from '@mui/material';
import {MathComponent} from 'mathjax-react';
import FormControl from '@mui/material/FormControl';
import {AppButton} from '../AppButton/AppButton';

export interface TestCardProps {
  onClick: () => void;
}

export const TestCard: FC<TestCardProps> = ({onClick}) => {
  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [firstAnswer, setFirstAnswer] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstAnswer((event.target as HTMLInputElement).value);
  };
  const checkCorrectAnswer = () => {
    if (firstAnswer === '2') {
      setOpenFinishModal(true);
    }
  };

  return (
    <div style={{marginLeft: 10}}>
      <Typography variant="h6">
        Вопрос 1. Найти интеграл{' '}
        <MathComponent
          tex={String.raw`\int  (2 x^{6} - 3 x^{4} + 7 x^{2} - 5)\ dx `}
          display={false}
        />
      </Typography>
      <FormControl style={{marginTop: 20}}>
        <FormLabel id="demo-radio-buttons-group-label">Выберите один вариант из спиака</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={firstAnswer}
          onChange={handleChange}
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label={
              <MathComponent
                tex={String.raw`2 x^{7} - 3 x^{5} + 7 x^{3} - 5x + C`}
                display={false}
              />
            }
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label={
              <MathComponent
                tex={String.raw`14 x^{7} - 15 x^{5} + 21 x^{3} - 5x + C`}
                display={false}
              />
            }
          />
          <FormControlLabel
            value="3"
            control={<Radio />}
            label={
              <MathComponent
                tex={String.raw`\frac{2}{7} x^{7} - \frac{3}{5} x^{5} + \frac{7}{3} x^{3} + C`}
                display={false}
              />
            }
          />
          <FormControlLabel
            value="4"
            control={<Radio />}
            label={
              <MathComponent
                tex={String.raw`\frac{2}{7} x^{7} - \frac{3}{5} x^{5} + \frac{7}{3} x^{3} -5 x + C`}
                display={false}
              />
            }
          />
        </RadioGroup>
      </FormControl>
      <Grid container>
        <AppButton
          color="primary"
          sx={{mr: 0}}
          onClick={() => {
            checkCorrectAnswer();
            onClick();
          }}
        >
          Завершить тест
        </AppButton>
      </Grid>
    </div>
  );
};
