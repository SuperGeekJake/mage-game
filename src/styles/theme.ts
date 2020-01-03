import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';

// @ts-ignore Incorrect type, object is partial, not complete
const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow[800]
    },
    secondary: {
      main: blue[700]
    },
    background: {
      default: '#E1E2E1'
    }
  }
});

export default theme;
