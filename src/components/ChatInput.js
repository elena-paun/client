import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CreateIcon from "@material-ui/icons/Create";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: "80px",
    fontFamily: "Montserrat",
    padding: "50px",
    //  boxShadow:
    //   "0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)",
  },
  root: {
    // "& .MuiTextField-root": {
    //   margin: theme.spacing(1),
    //   width: "75ch",
    // },
  },
  form: {
    width: "100%",
    height: "100%",
    marginTop: theme.spacing(3),
    fontFamily: "Montserrat",
  },
  typo: {
    fontFamily: "Montserrat",
  },
  message: {
    width: "100%",
  },
}));
export const ChatInput = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault(e);
    const isUserProvided = user && user !== "";
    const isMessageProvided = message && message !== "";

    if (isUserProvided && isMessageProvided) {
      props.sendMessage(user, message);
    } else {
      alert("Please insert an user and a message.");
    }
  };

  const onUserUpdate = (e) => {
    setUser(e.target.value);
  };

  const onMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Container component="main" fixed className={classes.main}>
      <Grid container>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <PersonAddIcon />

          <Typography
            component="h1"
            variant="h6"
            className={classes.typo}
          ></Typography>
          <br />
          <TextField
            className={classes.username}
            required
            value={user}
            margin="normal"
            name="user"
            id="user"
            label="user"
            variant="outlined"
            onChange={onUserUpdate}
            fullWidth
          />
          <br />
          <CreateIcon />
          <br />
          <TextField
            className={classes.message}
            margin="normal"
            id="message"
            value={message}
            type="test"
            name="message"
            label="Multiline"
            multiline
            rows={10}
            variant="outlined"
            onChange={onMessageUpdate}
            fullWidth
          />
          <br />
          <br />
          <Button
            className={classes.send}
            variant="outlined"
            onClick={() => {
              alert("clicked");
            }}
          >
            <SendIcon />
          </Button>
        </form>
      </Grid>
      <Box mt={5}></Box>
    </Container>
  );
};
