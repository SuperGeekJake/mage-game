import * as React from 'react';
import * as firebase from 'firebase/app'
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { useSession } from 'src/firebase/session';
import { Container } from 'src/styles';
import { Redirect } from 'react-router';

const Menu: React.FC = () => {
  const { error, data } = useSession();
  const handleSignIn = React.useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }, []);
  if (!error && data) return <Redirect to='/menu' />;
  return (
    <Container>
      <Content>
        <h1>Mage</h1>
        <p>The ultimate multiplayer strategy card game.</p>
      </Content>
      <Content>
        <Button variant="contained" onClick={handleSignIn}>Sign in with Google</Button>
      </Content>
    </Container>
  );
};

export default Menu;

const Content = styled(Box)({
  textAlign: 'center'
});
