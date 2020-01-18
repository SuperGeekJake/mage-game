import * as React from 'react';

export type State<Data, Error> = {
  data: Data | null,
  loading: boolean,
  error: Error | null
};

type NextAction<Data> = {
  type: 'next',
  payload: Data
};

type ErrorAction<Error> = {
  type: 'error',
  payload: Error
};

type Action<Data, Error> = NextAction<Data> | ErrorAction<Error>

const reducer = <Data, Error>() => (state: State<Data, Error>, action: Action<Data, Error>): State<Data, Error> => {
  switch(action.type) {
    case 'next':
      return  { ...state, data: action.payload, loading: false };
    case 'error':
      return { ...state, error: action.payload };
    default:
      throw new Error('Unknown loading action type');
  }
};

const onNext = <Data>(dispatch: React.Dispatch<NextAction<Data>>) => (data: Data) => {
  dispatch({ type: 'next', payload: data });
};

const onError = <Error>(dispatch: React.Dispatch<ErrorAction<Error>>) => (error: Error) => {
  dispatch({ type: 'error', payload: error });
};

export function useLoadingState<Data, Error>(): [State<Data, Error>, (data: Data) => void, (error: Error) => void] {
  const [state, dispatch] = React.useReducer(
    reducer<Data, Error>(),
    { data: null, loading: true, error: null }
  );

  const handleNext = React.useMemo(() => onNext<Data>(dispatch), []);
  const handleError = React.useMemo(() => onError<Error>(dispatch), []);
  return [state, handleNext, handleError];
}
