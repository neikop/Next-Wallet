import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { CssBaseline, LinearProgress, PaletteMode, ThemeProvider } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { GridEmpty } from 'components/common';
import { Nunito } from 'next/font/google';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'reducers/themeSlice';

export const appFont = Nunito({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Roboto', 'Arial', 'sans-serif'],
});

const createAppTheme = (mode?: PaletteMode) =>
  createTheme({
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: 'lg',
        },
      },
      MuiButton: {
        defaultProps: {
          size: 'large',
          variant: 'contained',
          color: 'primary',
          disableElevation: true,
        },
        styleOverrides: {
          sizeLarge: { minHeight: 48, minWidth: 48 },
          sizeMedium: { minHeight: 40, minWidth: 40 },
          sizeSmall: { minHeight: 32, minWidth: 32 },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
      },
      MuiPagination: {
        defaultProps: {
          variant: 'outlined',
          shape: 'rounded',
          size: 'large',
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'medium',
          InputLabelProps: { shrink: true },
        },
      },
      MuiDialog: {
        defaultProps: {
          maxWidth: 'sm',
          fullWidth: true,
        },
      },
      MuiDataGrid: {
        defaultProps: {
          autoHeight: true,
          disableColumnMenu: true,
          hideFooter: true,
          rowSelection: false,
          getRowHeight: () => 'auto',
          slots: {
            noRowsOverlay: GridEmpty,
            loadingOverlay: LinearProgress,
            columnSortedAscendingIcon: ArrowDropUp,
            columnSortedDescendingIcon: ArrowDropDown,
          },
          showCellVerticalBorder: true,
          showColumnVerticalBorder: true,
        },
      },
    },
    typography: {
      fontFamily: appFont.style.fontFamily,
      button: { fontWeight: 700, textTransform: 'none' },
    },
    palette: {
      primary: {
        main: '#673ab7',
      },
      secondary: {
        main: '#2979ff',
      },
      mode,
    },
    shape: {
      borderRadius: 8,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1400,
        xl: 1600,
      },
    },
  });

export const appTheme = createAppTheme();

const AppTheme = ({ children }) => {
  const { mode } = useSelector(themeSelector);

  useEffect(() => {
    document.body.dataset.theme = mode;
  }, [mode]);

  return (
    <ThemeProvider theme={responsiveFontSizes(createAppTheme(mode))}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
