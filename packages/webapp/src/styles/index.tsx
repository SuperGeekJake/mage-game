import * as React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

import theme from './theme'
import GlobalStyles from './GlobalStyles'

export const StyleProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export const Container = styled(Box)({
  display: 'flow-root'
});
