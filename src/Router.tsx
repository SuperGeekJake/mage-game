import * as React from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';

import { useSession, ProtectedRoute } from 'src/firebase/session';
import Loading from 'src/Loading';
import Menu from 'src/Menu';
import Login from 'src/Login';

const Router: React.FC = () => {
  const { loading } = useSession();
  if (loading) return <Loading />;
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path='/menu' component={Menu} />
        <Route exact path='/login' component={Login} />
        <Redirect exact from='/' to='/menu' />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
