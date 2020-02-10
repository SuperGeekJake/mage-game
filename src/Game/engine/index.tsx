import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';

import { useSession } from 'src/firebase/session';
import reducer, { initState } from './reducer';
import Loading from 'src/Loading';

export * from './types'

export interface Props {
  game: firebase.firestore.DocumentReference;
  children: React.ReactChild;
};

export default function GameProvider({ game, children }: Props) {
  // In this case, routing wouldn't allow data to be null for this component
  const { data: user } = (useSession() as { data: firebase.User });
  const [store, setStore] = React.useState<Store | null>(null);

  React.useEffect(() => {
    setStore(createStore(reducer, { ...initState, playerID: user.uid, gameID: game.id }));
  }, [game]);

  if (!store) return <Loading />;
  return <Provider store={store} children={children} />
}
