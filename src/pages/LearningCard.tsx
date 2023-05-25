import React, {FC} from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import {IntegralIntroductionPage} from './LearningCards/IntegralIntroductionPage';
import {TestCard} from '../components/learning/TestCard';
import {TableIntegralsCard} from './LearningCards/TableIntegralsCard';
import {Practice} from '../components/learning/Practice';
import {AppButton} from '../components/AppButton/AppButton';

const steps = ['Лекция', 'Практика', 'Тест'];

export const LearningCard: FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <>
      <Grid container style={{marginTop: 15}}>
        <Grid item xs={6}>
          <Typography variant="h4">2. Таблица интегралов и правила интегрирования</Typography>
        </Grid>
        <Grid item xs={6}>
          <Stepper nonLinear activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
      <Grid style={{marginTop: 15}}>
        <Card sx={{minWidth: 300, border: '1px solid rgba(211,211,211,0.6)', borderRadius: 2}}>
          <CardHeader title={steps[activeStep]} style={{marginLeft: 10}} />
          <CardContent sx={{height: '80vh', lineHeight: 0}}>
            <Grid container>
              <Grid item style={{marginLeft: 10}}>
                {activeStep === 0 && (
                  <TableIntegralsCard
                    onClick={() => {
                      handleComplete();
                    }}
                  />
                )}
                {activeStep === 1 && (
                  <Practice
                    onClick={() => {
                      handleComplete();
                    }}
                  />
                )}
                {activeStep === 2 && (
                  <TestCard
                    onClick={() => {
                      handleComplete();
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};
