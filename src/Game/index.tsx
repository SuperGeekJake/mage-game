import * as React from 'react';
import { useParams } from 'react-router-dom'
import * as firebase from 'firebase';
import 'firebase/firebase-firestore';

import GameProvider from './engine';
import Loading from 'src/Loading';
// import useFirebaseDocument from 'src/firebase/useFirebaseDocument';

const db = firebase.firestore()

const Game: React.FC = () => {
  const { id: gameID } = useParams();
  const [gameRef, setGameRef] = React.useState<firebase.firestore.DocumentReference | null>(null);

  React.useEffect(() => {
    setGameRef(db.collection('games').doc(gameID));
  }, [gameID]);

  if (!gameRef) return <Loading />;
  return (
    <GameProvider game={gameRef}>
      <div>Game UI</div>
    </GameProvider>
  )
}

export default Game;
