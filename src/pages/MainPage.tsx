import {Box, Grid, TextField} from '@mui/material';
import {AppButton} from '../components/AppButton/AppButton';
import {useState} from 'react';
import MathJax from 'react-mathjax';
import {convertToFunc} from '../utils/parser/parser';
import {convertToMathJax} from '../utils/MathJax/convertToMathJax';
import {convertToPlot} from '../utils/functionPlot/convertToFunctionPlot';
import {FunctionPlot} from '../components/FunctionPlot/FunctionPlot';
import {getDerivativeFunc} from '../utils/derivative/getDerivativeFuc';

export const MainPage = () => {
  const [expression, setExpression] = useState('');
  const [funcString, setFuncString] = useState('');
  const [derivative, setDerivative] = useState('');
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
    setDerivative(getDerivativeFunc(node, 'x'));
  };
  // todo 1) очищает строку запроса при ентере
  // todo 2) добавляет лишние скобки в mathjax
  // todo 3) темный график
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
        <Grid container rowSpacing={1}>
          <Grid item xs={10}>
            <TextField
              label="Введите функцию"
              variant="outlined"
              onChange={e => setExpression(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
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

        <Grid item xs={10}>
          <MathJax.Provider>
            <MathJax.Node formula={getCalculateExp()} />
          </MathJax.Provider>
        </Grid>
        <Grid item xs={10} alignItems="center">
          <MathJax.Provider>
            <MathJax.Node formula={derivative} />
          </MathJax.Provider>
        </Grid>
        <Grid item xs={10}>
          {funcString !== '' && (
            <FunctionPlot funcString={funcString} derivativeString={derivative} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
