import {SyntheticEvent, useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Button,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent,
  InputAdornment
} from '@mui/material';
import {useAppStore} from '../store';
import {AppLink} from '../components/AppLink/AppLink';
import {AppButton} from '../components/AppButton/AppButton';
import {AppIconButton} from '../components/AppIconButton/AppIconButton';
import {AppAlert} from '../components/AppAlert/AppAlert';
import {useAppForm} from '../utils/form/form';
import {AppForm} from '../components/AppForm/AppForm';
import {isNull} from 'lodash';

const VALIDATE_FORM_LOGIN_EMAIL = {
  email: {
    presence: true,
    email: {
      message: 'Введите корректный email'
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      maximum: 32,
      message: 'Пароль должен состоять должен содержать не менее 8 символов'
    }
  }
};

export const SHARED_CONTROL_PROPS = {
  variant: 'outlined',
  margin: 'normal', // 'dense', 'none'
  fullWidth: true
} as const;

interface FormStateValues {
  email: string;
  password: string;
}

const LoginEmailView = () => {
  const navigate = useNavigate();
  const [, dispatch] = useAppStore();
  const [formState, , /* setFormState */ onFieldChange, fieldGetError, fieldHasError] = useAppForm({
    validationSchema: VALIDATE_FORM_LOGIN_EMAIL,
    initialValues: {email: '', password: ''} as FormStateValues
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>();
  const values = formState.values as FormStateValues; // Typed alias to formState.values as the "Source of Truth"

  const handleShowPasswordClick = useCallback(() => {
    setShowPassword(oldValue => !oldValue);
  }, []);

  const handleFormSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      const result = true; // await api.auth.loginWithEmail(values);
      if (!result) {
        setError('Проверьте корректность введенных полей');
        return;
      }

      dispatch({type: 'LOG_IN'});
      navigate('/', {replace: true});
    },
    [dispatch, /* values,*/ navigate]
  );

  const handleCloseError = useCallback(() => setError(undefined), []);
  return (
    <AppForm onSubmit={handleFormSubmit}>
      <Card style={{marginTop: 100}}>
        <CardHeader title="Вход" />
        <CardContent>
          <TextField
            required
            label="Логин"
            name="email"
            value={values.email}
            error={fieldHasError('email')}
            helperText={fieldGetError('email') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
          />
          <TextField
            required
            type={showPassword ? 'text' : 'password'}
            label="Пароль"
            name="password"
            value={values.password}
            error={fieldHasError('password')}
            helperText={fieldGetError('password') || ' '}
            onChange={onFieldChange}
            {...SHARED_CONTROL_PROPS}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AppIconButton
                    aria-label="toggle password visibility"
                    icon={showPassword ? 'visibilityon' : 'visibilityoff'}
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                    onClick={handleShowPasswordClick}
                    // onMouseDown={eventPreventDefault}
                  />
                </InputAdornment>
              )
            }}
          />
          {error ? (
            <AppAlert severity="error" onClose={handleCloseError}>
              {error}
            </AppAlert>
          ) : null}
          <Grid container justifyContent="center" alignItems="center">
            <AppButton type="submit" disabled={!formState.isValid}>
              Войти
            </AppButton>
            <Button variant="text" color="inherit" component={AppLink} to="/auth/recovery/password">
              Забыли пароль?
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </AppForm>
  );
};

export default LoginEmailView;
