export const modalStyles = {
  wrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 430,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 0,
    p: 4
  },
  inputFields: {
    'display': 'flex',
    'flexDirection': 'column',
    'marginTop': '20px',
    'marginBottom': '20px',
    '.MuiTextField-root': {
      marginBottom: '20px'
    },
    '.MuiSelect-root': {
      marginBottom: '20px'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'end'
  }
};
