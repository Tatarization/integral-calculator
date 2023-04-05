import {Box, Grid, TextField} from '@mui/material';
import {AppButton} from '../components/AppButton/AppButton';
import {useState} from 'react';
import MathJax from 'react-mathjax';
import {convertToFunc} from '../utils/parser/parser';
import {convertToMathJax} from '../utils/MathJax/convertToMathJax';
import {convertToPlot} from '../utils/functionPlot/convertToFunctionPlot';
import {FunctionPlot} from '../components/FunctionPlot/FunctionPlot';

export const MainPage = () => {
  const [expression, setExpression] = useState('');
  const [funcString, setFuncString] = useState('');
  const getCalculateExp = (): string => {
    try {
      const node = convertToFunc(expression.toLowerCase());
      console.log(node);
      const res = convertToMathJax(node);
      return res === '0' ? '' : res;
    } catch {
      return '';
    }
  };

  const handleClick = () => {
    const node = convertToFunc(expression.toLowerCase());
    setFuncString(convertToPlot(node));
  };

  return (
    <Box
      component="form"
      sx={{
        'mt': 3,
        '& .MuiTextField-root': {my: 1, width: '100%'}
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container>
        <Grid container>
          <Grid xs={10}>
            <TextField
              label="Введите функцию"
              variant="outlined"
              onChange={e => setExpression(e.target.value)}
            />
          </Grid>
          <Grid xs={2}>
            <AppButton
              color={'primary'}
              sx={{mr: 0}}
              onClick={handleClick}
              style={{height: 56, fontSize: 20}}
            >
              =
            </AppButton>
          </Grid>
        </Grid>

        <Grid xs={10}>
          <MathJax.Provider>
            <MathJax.Node formula={getCalculateExp()} />
          </MathJax.Provider>
        </Grid>
        <Grid xs={10}>{funcString !== '' && <FunctionPlot funcString={funcString} />}</Grid>
      </Grid>
    </Box>
  );
};
