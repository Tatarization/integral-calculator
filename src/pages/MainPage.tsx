import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  Container,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField
} from '@mui/material';
import {pink} from '@mui/material/colors';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import {AppButton} from '../components/AppButton/AppButton';
import {ChangeEvent, useState} from 'react';
import {convertToFunc} from '../utils/parser/parser';
import {convertToMathJax} from '../utils/MathJax/convertToMathJax';
import {convertToPlot} from '../utils/functionPlot/convertToFunctionPlot';
import {FunctionPlot} from '../components/FunctionPlot/FunctionPlot';
import {getIntegralFunction} from '../utils/integrals/getIntegralFunction';
import {MathJaxIntegral} from '../components/MathJaxIngeral';
import {MathComponent} from 'mathjax-react';
import {IntegralSettingsModal} from '../components/IntegralSettingsModal';
import FormControl from '@mui/material/FormControl';
import {getDerivativeFunc} from '../utils/derivative/getDerivativeFuc';

export const MainPage = () => {
  const [expression, setExpression] = useState('');
  const [funcString, setFuncString] = useState('');
  const [integral, setIntegral] = useState('');
  const [definitiveIntegral, setDefinitiveIntegral] = useState('');
  const [derivative, setDerivative] = useState('');
  const [isOpenSettingsModal, setIsOpenSettingsModal] = useState(false);
  const [isOpenResult, setIsOpenResult] = useState(true);
  const [isOpenGraph, setIsOpenGraph] = useState(true);
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [variableDiff, setVariableDiff] = useState('x');
  const [isDefinite, setIsDefinite] = useState(false);
  const [constant, setConstant] = useState('0');
  const [graphs, setGraphs] = useState({
    initialPlot: true,
    integralPlot: true,
    derivativePlot: true,
    rangePlot: false
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGraphs({
      ...graphs,
      [event.target.name]: event.target.checked
    });
  };

  const {initialPlot, integralPlot, derivativePlot, rangePlot} = graphs;

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

  const handleIsOpenSettingsModal = () => {
    setIsOpenSettingsModal(() => !isOpenSettingsModal);
  };

  const handleClick = () => {
    const node = convertToFunc(expression.toLowerCase());
    setFuncString(convertToPlot(node));
    if (isDefinite) {
      const formula = getIntegralFunction(
        node,
        variableDiff,
        isDefinite,
        lowerLimit,
        upperLimit
      ).split('=');
      console.log(formula);
      setDefinitiveIntegral(formula[1]);
      setIntegral(formula[0].trim());
    } else {
      setIntegral(getIntegralFunction(node, variableDiff, isDefinite, lowerLimit, upperLimit));
    }

    setDerivative(getDerivativeFunc(node, variableDiff));
  };

  const onSubmitSettings = (
    isDefinite: boolean,
    variableDiff: string,
    lowerLimit?: string,
    upperLimit?: string
  ) => {
    setIsDefinite(isDefinite);
    if (variableDiff === '') {
      setVariableDiff('x');
    }
    setVariableDiff(variableDiff);
    if (isDefinite) {
      setLowerLimit(lowerLimit!);
      setUpperLimit(upperLimit!);
    }
    handleIsOpenSettingsModal();
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
      <Grid container style={{marginLeft: 25}}>
        <Grid container rowSpacing={1}>
          <Grid item xs={7}>
            <TextField
              label="Введите функцию"
              variant="outlined"
              onChange={e => setExpression(e.target.value)}
            />
          </Grid>
          <Grid item>
            <AppButton
              color="primary"
              sx={{mr: 0}}
              onClick={handleClick}
              style={{height: 56, fontSize: 20}}
            >
              =
            </AppButton>
          </Grid>
          <Grid item>
            <AppButton
              color="secondary"
              onClick={handleIsOpenSettingsModal}
              style={{height: 56, fontSize: 14}}
            >
              <SettingsSharpIcon style={{height: 56}} fontSize={'large'} color="inherit" />
            </AppButton>
          </Grid>
        </Grid>
        <Grid item xs={8} style={{marginTop: 5}}>
          <Card sx={{minWidth: 300, border: '1px solid rgba(211,211,211,0.6)', borderRadius: 5}}>
            <CardHeader title="Будет вычислено следующее выражение:" />
            <CardContent>
              <Container sx={{height: 40, lineHeight: 0}}>
                <MathJaxIntegral
                  expr={getCalculateExp()}
                  variableDiff={variableDiff}
                  isDefinite={isDefinite}
                  lowerLimit={lowerLimit!}
                  upperLimit={upperLimit!}
                />
              </Container>
            </CardContent>
          </Card>
        </Grid>
        {integral !== '' && (
          <Grid item xs={8} style={{marginTop: 10}}>
            <Card sx={{minWidth: 300, border: '1px solid rgba(211,211,211,0.6)', borderRadius: 5}}>
              <CardHeader
                title="Результаты вычислений"
                onClick={() => setIsOpenResult(prev => !prev)}
              />
              <Collapse in={isOpenResult} timeout="auto" unmountOnExit>
                <CardContent>
                  <Container sx={{height: 40, lineHeight: 0}}>
                    <MathComponent
                      tex={`${integral} + C ${isDefinite ? `= ${definitiveIntegral}` : ''}`}
                      display={true}
                    />
                  </Container>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        )}
        {integral !== '' && (
          <Grid item xs={8} style={{marginTop: 10}}>
            <Card
              sx={{
                minWidth: 300,
                border: '1px solid rgba(211,211,211,0.6)',
                borderRadius: 5,
                height: 900
              }}
            >
              <CardHeader title="Графики функций" onClick={() => setIsOpenGraph(prev => !prev)} />
              <Collapse in={isOpenGraph} timeout="auto" unmountOnExit>
                <CardContent>
                  {funcString !== '' && (
                    <Grid container>
                      <FunctionPlot
                        integralFunction={integralPlot ? integral : undefined}
                        initialFunction={initialPlot ? funcString : undefined}
                        derivativeFunction={derivativePlot ? derivative : undefined}
                        isDefinite={isDefinite}
                        range={rangePlot ? [Number(lowerLimit), Number(upperLimit)] : undefined}
                        constant={constant ?? '0'}
                      />
                      <Card
                        sx={{
                          minWidth: 150,
                          border: '1px solid rgba(211,211,211,0.6)',
                          borderRadius: 5,
                          height: 600
                        }}
                      >
                        <CardHeader title="Настройки графика" />
                        <CardContent>
                          <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                            <FormLabel component="legend">Выберите графики</FormLabel>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={initialPlot}
                                    onChange={handleChange}
                                    name="initialPlot"
                                    sx={{
                                      'color': pink[800],
                                      '&.Mui-checked': {
                                        color: pink[600]
                                      }
                                    }}
                                  />
                                }
                                label={<MathComponent tex={`f(${variableDiff})`} display={true} />}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={integralPlot}
                                    onChange={handleChange}
                                    name="integralPlot"
                                  />
                                }
                                label={<MathComponent tex={`F(${variableDiff})`} display={true} />}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={derivativePlot}
                                    onChange={handleChange}
                                    name="derivativePlot"
                                    color="success"
                                  />
                                }
                                label={<MathComponent tex={`f'(${variableDiff})`} display={true} />}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={rangePlot}
                                    onChange={handleChange}
                                    disabled={!isDefinite}
                                    name="rangePlot"
                                    sx={{
                                      'color': '#d3d3d3',
                                      '&.Mui-checked': {
                                        color: '#d3d3d3'
                                      }
                                    }}
                                  />
                                }
                                label={<MathComponent tex={`S(${variableDiff})`} display={true} />}
                              />
                              <TextField
                                label="Введите значение C"
                                variant="outlined"
                                onChange={e => {
                                  if (e.target.value !== '-' && e.target.value !== '+') {
                                    setConstant(e.target.value);
                                  }
                                }}
                              />
                            </FormGroup>
                          </FormControl>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        )}
      </Grid>
      <IntegralSettingsModal
        isOpen={isOpenSettingsModal}
        handleClose={handleIsOpenSettingsModal}
        onSubmitSettings={onSubmitSettings}
      />
    </Box>
  );
};
