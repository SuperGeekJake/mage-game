import * as React from 'react';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/core/styles';

import Router from 'src/Router';
import { StyleProvider } from './styles';
import { SessionProvider } from './firebase/session';

const App: React.FC = () => {
  return (
    <StyleProvider>
      <AppContainer>
        <SessionProvider>
          <Router />
        </SessionProvider>
      </AppContainer>
    </StyleProvider>
  );
};

export default App;

const AppContainer = styled(Container)({
  width: '100%',
  height: '100%'
});
