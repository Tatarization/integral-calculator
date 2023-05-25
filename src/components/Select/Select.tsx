import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {ALLOWED_ARGS} from '../../utils/parser/consts';

export const BaseSelect = () => {
  const [arg, setArg] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setArg(event.target.value as string);
  };

  return (
    <div>
      <FormControl sx={{m: 1, width: 300}}>
        <InputLabel id="demo-simple-select-label">Переменная интегрирования</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={arg}
          label="Переменная интегрирования"
          onChange={handleChange}
          defaultValue={ALLOWED_ARGS[20]}
        >
          {ALLOWED_ARGS.map((arg, index) => (
            <MenuItem key={index} value={arg}>
              {arg}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
