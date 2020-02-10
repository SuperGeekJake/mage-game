import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import ComputerIcon from '@material-ui/icons/Computer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { useSession } from 'src/firebase/session';
import RouterButton from 'src/RouterButton';

export default function NewGame() {
  const { data: user } = useSession();
  return (
    <Grid item>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <IconButton>
            <PersonAddIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <AddToQueueIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Container>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={user?.photoURL || undefined} alt={`${user?.displayName} avatar`}>
                {user?.displayName?.slice(0, 3)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user?.displayName}
            />
          </ListItem>
          {arr.map((__, index) => (
            <React.Fragment key={index}>
              <Divider />
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <ComputerIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Computer"
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Container>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Button variant="contained" size="large" color="primary">Start game</Button>
        </Grid>
        <Grid item>
          <RouterButton variant="contained" size="large" to="/menu">Cancel</RouterButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

const arr = Array(5).fill(undefined);

const Container = styled(Box)({
  minWidth: '400px',
  marginBottom: '30px'
});
