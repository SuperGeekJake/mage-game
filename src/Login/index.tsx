import * as React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { useSession } from 'src/firebase/session';
import { Container } from 'src/styles';
import { Redirect } from 'react-router';

const Menu: React.FC = () => {
  // TODO: Display error msg on session error
  const { data } = useSession();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider);
  };

  if (data) return <Redirect to='/menu' />;
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

const provider = new firebase.auth.GoogleAuthProvider();

const Content = styled(Box)({
  textAlign: 'center'
});
