<<<<<<< HEAD
import React from "react";
import { Card as MuiCard, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useCardStyles = makeStyles({
  root: {
    width: "105px",
    height: "150px",
    color: (props) => {
      if (props.card === null) {
        return "black";
      }
      if (props.hide) {
        return "black";
      }
      switch (props.card.suit) {
        case "❤":
        case "♦":
          return "red";
        default:
          return "black";
      }
    },
    border: "1px solid grey"
  },
  content: {
    width: "100%",
    height: "100%"
  },
  top: {
    height: "30px",
    marginLeft: "10px"
  },
  middle: {
    fontSize: "30px",
    height: "90px",
    lineHeight: "90px"
  },
  bottom: {
    height: "30px",
    marginRight: "10px"
  }
});

export default function Card(props) {
  const classes = useCardStyles(props);
  const topAndBottom =
    props.card === null || props.hide ? "?" : props.card.suit + props.card.rank;
  const middle = props.card === null || props.hide ? "?" : props.card.suit;

  return (
    <MuiCard className={classes.root}>
      <Box className={classes.content} display="flex" flexDirection="column">
        <Box className={classes.top} alignSelf="flex-start">
          {topAndBottom}
        </Box>
        <Box className={classes.middle}>{middle}</Box>
        <Box className={classes.bottom} alignSelf="flex-end">
          {topAndBottom}
        </Box>
      </Box>
    </MuiCard>
  );
}
=======
import React from "react";
import { Card as MuiCard, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useCardStyles = makeStyles({
  root: {
    width: "105px",
    height: "150px",
    color: (props) => {
      if (props.card === null) {
        return "black";
      }
      if (props.hide) {
        return "black";
      }
      switch (props.card.suit) {
        case "❤":
        case "♦":
          return "red";
        default:
          return "black";
      }
    },
    border: "1px solid grey"
  },
  content: {
    width: "100%",
    height: "100%"
  },
  top: {
    height: "30px",
    marginLeft: "10px"
  },
  middle: {
    fontSize: "30px",
    height: "90px",
    lineHeight: "90px"
  },
  bottom: {
    height: "30px",
    marginRight: "10px"
  }
});

export default function Card(props) {
  const classes = useCardStyles(props);
  const topAndBottom =
    props.card === null || props.hide ? "?" : props.card.suit + props.card.rank;
  const middle = props.card === null || props.hide ? "?" : props.card.suit;

  return (
    <MuiCard className={classes.root}>
      <Box className={classes.content} display="flex" flexDirection="column">
        <Box className={classes.top} alignSelf="flex-start">
          {topAndBottom}
        </Box>
        <Box className={classes.middle}>{middle}</Box>
        <Box className={classes.bottom} alignSelf="flex-end">
          {topAndBottom}
        </Box>
      </Box>
    </MuiCard>
  );
}
>>>>>>> 7ec37440df49fb67471bcb2a3b5f0343725826c5
