import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Loading: React.FC = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <LoadingText>Loading...</LoadingText>
      </Grid>
    </Grid>
  );
};

export default Loading;

const LoadingText = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 600,
  textTransform: 'uppercase',
});
