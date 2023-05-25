import React, {FC, useState} from 'react';
import {Box, Checkbox, FormControlLabel, Modal, TextField, Typography} from '@mui/material';
import {AppButton} from './AppButton/AppButton';
import {modalStyles} from './Modal/styles';

export interface IntegralSettingsModalProps {
  isOpen: boolean;
  onSubmitSettings: (
    isDefinite: boolean,
    variableDiff: string,
    lowerLimit?: string,
    upperLimit?: string
  ) => void;
  handleClose?: () => void;
}

export const IntegralSettingsModal: FC<IntegralSettingsModalProps> = ({
  isOpen,
  handleClose,
  onSubmitSettings
}) => {
  const [lowerLimit, setLowerLimit] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [variableDiff, setVariableDiff] = useState('x');
  const [isDefinite, setIsDefinite] = useState(false);

  const handleChange = (event: any) => {
    setIsDefinite(event.target.checked);
  };

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Box sx={modalStyles.wrapper}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Настройки параметров калькулятора
        </Typography>
        <Box sx={modalStyles.inputFields}>
          <FormControlLabel
            control={<Checkbox checked={isDefinite} onChange={handleChange} />}
            label="Определенный интеграл"
            style={{marginBottom: 15}}
          />
          <TextField
            label="Переменная интегрирования"
            variant="outlined"
            defaultValue="x"
            onChange={e => setVariableDiff(e.target.value)}
          />

          <TextField
            label="Нижний предел"
            variant="outlined"
            disabled={!isDefinite}
            onChange={e => setLowerLimit(e.target.value)}
          />
          <TextField
            label="Верхний предел"
            variant="outlined"
            disabled={!isDefinite}
            onChange={e => setUpperLimit(e.target.value)}
          />
          <Box sx={modalStyles.buttons}>
            <AppButton color="primary" sx={{mr: 0}} onClick={handleClose}>
              Закрыть
            </AppButton>
            <AppButton
              color="primary"
              sx={{mr: 0}}
              onClick={() => onSubmitSettings(isDefinite, variableDiff, lowerLimit, upperLimit)}
            >
              Сохранить
            </AppButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
