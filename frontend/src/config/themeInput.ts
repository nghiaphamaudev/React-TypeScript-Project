import { createTheme } from '@mui/material/styles';

const themeTextField = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif', // sử dụng font Poppins
  },
  palette: {
    primary: {
      main: '#1d4ed8', // màu sắc chính
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
              boxShadow: 'none',
              outline: 'none', // loại bỏ boxShadow khi focus
            },
          },
          '& .MuiInputBase-input': {
            color: '#111827',
            fontSize: '0.875rem',
            padding: '0.625rem',
            '&:focus': {
              outline: 'none', // loại bỏ outline khi focus input
            },
          },
        },
      },
    },
  },
});

export default themeTextField;
