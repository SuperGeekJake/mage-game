import * as React from 'react';
import * as firebase from 'firebase/app';

import useStreamState from './useStreamState'

/**
 * Returns the current state and a setter function for a Firebase Document.
 *
 * If a documentID is not provided, a new document is created upon first set.
 */
export const useFirebaseDocument = (collectionName: string, documentID?: string) => {
  const [state, onNext, onError, onReset] = useStreamState<firebase.firestore.DocumentData | null, Error>()

  const ref = React.useRef<firebase.firestore.DocumentReference | null>(null);
  const subscription = React.useRef<firebase.Unsubscribe | null>(null);
  React.useEffect(() => {
    ref.current = firebase.firestore()
      .collection(collectionName)
      .doc(documentID);

    subscription.current = firebase.firestore()
      .collection(collectionName)
      .doc(documentID)
      .onSnapshot((doc) => {
        onNext(doc.data() || null);
      }, onError);

    return () => {
      onReset(); // In case props change and we need to restart the stream with a new data target
      if (subscription.current) subscription.current();
    };
  }, [collectionName, documentID, onNext, onError]);

  return state;
};

export default useFirebaseDocument;
