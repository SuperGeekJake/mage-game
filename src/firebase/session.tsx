import * as React from 'react';
import * as firebase from 'firebase/app';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import useStreamState, { State as LoadingState } from './useStreamState'

type Data = firebase.User | null
type Error = firebase.auth.Error
type State = LoadingState<Data, Error>

export const SessionContext = React.createContext<State | null>(null);

export const SessionProvider: React.FC = ({ children }) => {
  const [state, onNext, onError] = useStreamState<Data, Error>()

  const subscription = React.useRef<firebase.Unsubscribe | null>(null);
  React.useEffect(() => {
    subscription.current = firebase.auth().onAuthStateChanged(onNext, onError);

    return () => {
      if (subscription.current) subscription.current();
    };
  }, [onNext, onError]);

  return <SessionContext.Provider value={state} children={children} />;
};

export const useSession = () => {
  const state = React.useContext(SessionContext);
  if (!state) throw new Error('Missing SessionProvider in tree');

  return state;
}

export const ProtectedRoute: React.FC<RouteProps> = ({ component: RouteComponent, ...props }) => {
  const { data } = useSession();
  return (
    <Route
      {...props}
      render={
        (routeCompProps) => (!data)
          ? <Redirect to='/login' />
          // @ts-ignore TODO: Need to fix
          : <RouteComponent {...routeCompProps} />
      }
    />
  );
};
