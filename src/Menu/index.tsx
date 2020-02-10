import * as React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Logo from 'src/Logo';
import RouterButton from 'src/RouterButton';
import NewGame from 'src/Menu/NewGame';

const Menu: React.FC = () => {
  const { path, url } = useRouteMatch();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      <Switch>
        <Route path={`${path}/main`}>
          <Grid item>
            <GameTitle>
              Mage
            </GameTitle>
            <Logo />
          </Grid>
          <Grid item>
            <ButtonGroup
              orientation="vertical"
              variant="contained"
              size="large"
              aria-label="vertical large contained button group"
            >
              <RouterButton to={`${url}/continue`}>Continue game</RouterButton>
              <RouterButton to={`${url}/new`}>Start new game</RouterButton>
              <RouterButton to={`${url}/history`}>View history</RouterButton>
              <RouterButton to={`${url}/logout`}>Sign out</RouterButton>
            </ButtonGroup>
          </Grid>
        </Route>
        <Route path={`${path}/continue`}>
          <Typography>A list of the current in-progress games to choose from.</Typography>
        </Route>
        <Route path={`${path}/new`} component={NewGame} />
        <Route path={`${path}/history`}>
          <Typography>A list of previous games and how you scored.</Typography>
        </Route>
        <Route path={`${path}/logout`}>
          <Typography component="h2">Are you sure you want to sign out?</Typography>
          <Button>Yes</Button><Button>No</Button>
        </Route>
        <Redirect to={`${url}/main`} />
      </Switch>
    </Grid>
  );
};

export default Menu;

const GameTitle = styled(Typography)({
  fontSize: '2.7rem',
  textTransform: 'uppercase',
  fontWeight: 500,
});
