import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif', // sử dụng font poppins
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

const MyInput = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <TextField
      sx={{ border: 'none' }}
      name="name"
      id="name"
      error
      placeholder="Type product name"
      fullWidth
    />
  </ThemeProvider>
);

export default MyInput;
