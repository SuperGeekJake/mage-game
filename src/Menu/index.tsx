import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// import { Container } from 'src/styles';

const Menu: React.FC = () => {
  return (
    <Container>
      <Layout>
        <Box>
          <h1>Mage</h1>
        </Box>
        <Box>
          <MenuButton variant="contained" size="large">Continue game</MenuButton>
          <MenuButton variant="contained" size="large">Start new game</MenuButton>
          <MenuButton variant="contained" size="large">Sign out</MenuButton>
        </Box>
      </Layout>
    </Container>
  );
};

export default Menu;

const Layout = styled(Box)({
  display: 'flex',
  flexFlow: 'row nowrap'
});

const MenuButton = styled(Button)({
  display: 'block',
  width: '100%',
  marginBottom: '15px'
});
