import * as React from 'react';

export type State<Data, Error> = {
  loading: boolean,
  data: Data | null,
  error: Error | null
};

type ReturnType<Data, Error> = [
  State<Data, Error>,
  (data: Data) => void,
  (error: Error) => void,
  () => void
];

const defaultState = {
  loading: true,
  data: null,
  error: null
};

export default function useStreamState<Data, Error>(): ReturnType<Data, Error> {
  const [state, setState] = React.useState<State<Data, Error>>(defaultState);
  const handleNext = (data: Data) => { setState({ loading: false, error: null, data }); };
  const handleError = (error: Error) => { setState({ loading: false, data: null, error }); };
  const handleReset = () => { setState(defaultState); };

  return [
    state,
    handleNext,
    handleError,
    handleReset
  ];
}
