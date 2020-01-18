import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  '@global': {
    'html, body, #root': {
      width: '100%',
      height: '100%'
    }
  }
}), { name: 'GlobalStyles' });

const GlobalStyles: React.FC = ({ children = null }) => {
  useStyles();
  return <>{children}</>;
};

export default GlobalStyles;
