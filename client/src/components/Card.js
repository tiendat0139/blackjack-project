import React, { useContext } from "react";
import { Card as MuiCard, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ThemeContext } from "../provider/ThemeProvider";

const useCardStyles = makeStyles({
  root: {
    width: "105px",
    height: "150px",
    marginBottom: "16px",
    border: "1px solid grey"
  },
  content: {
    width: "100%",
    height: "100%",
  },
  top: {
    height: "30px",
    marginLeft: "10px",
    display: "flex",
  },
  middle: {
    fontSize: "30px",
    height: "90px",
    lineHeight: "90px",
    display: "flex",
    justifyContent: "center"
  },
  bottom: {
    height: "30px",
    marginRight: "10px",
    display: "flex",
    justifyContent: "end"
  }
});

export default function Card(props) {
  const { pattern } = useContext(ThemeContext)
  const classes = useCardStyles(props);
  const topAndBottom =
    props.card === null || props.hide ? "?" : props.card?.suit + props.card?.rank;
  const middle = props.card === null || props.hide ? "?" : props.card?.suit;

  return (
    <MuiCard className={classes.root}>
      <Box
        className={classes.content}
        display="flex"
        flexDirection="column"
        style={{
          color: props.card?.suit === "❤" || props.card?.suit === "♦" ? "red" : "black"
        }}
      >
        {(topAndBottom != "?" && middle != "?") ? (
          <>
            <Box className={classes.top} alignSelf="flex-start">
              {topAndBottom}
            </Box>
            <Box className={classes.middle}>{middle}</Box>
            <Box className={classes.bottom} alignSelf="flex-end">
              {topAndBottom}
            </Box>
          </>
        ) : (
            <img src={props.srcImg} style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
           }} />
        )}
      </Box>
    </MuiCard>
  );
}
