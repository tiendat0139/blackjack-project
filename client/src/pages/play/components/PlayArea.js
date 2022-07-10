import React, { useContext } from "react";
import { Box, Grid, Chip } from "@material-ui/core";
import * as BJUtilities from "../../../utilities/BlackJackUtilities"
import { useStyles } from "../../../hooks/useStyles";
import Card from "../../../components/Card";
import { ThemeContext } from "../../../provider/ThemeProvider";

export default function PlayArea(props) {
  const { pattern } = useContext(ThemeContext)

  const classes = useStyles();
  return (
    <Box className={classes.playArea}>
      <Grid
        container
        direction="column"
        spacing={5}
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Box
            className="arrow_box_common arrow_box_dealer"
          >
            {props.dealersHand.length !== 0 && props.isTurnEnd ?
              BJUtilities.getScoreForDisplay(props.dealersHand) : "?"}
          </Box>
          <Grid container direction="row">
            {props.dealersHand.map((card, index) => {
              let marginLeft = index === 0 ? "0px" : "-50px";
              const hide = index === 1 && !props.isTurnEnd ? true : false;
              return (
                <Grid item key={index} style={{ marginLeft: marginLeft }}>
                  <Card card={card} hide={hide} srcImg={pattern} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row">
            {props.playersHand.map((card, index) => {
              let marginLeft = index === 0 ? "0px" : "-50px";
              return (
                <Grid item key={index} style={{ marginLeft: marginLeft }}>
                  <Card card={card} hide={false} />
                </Grid>
              );
            })}
          </Grid>
          <Box className={classes.winOrLoseContainer}>
            {props.isTurnEnd && (
              <Chip
                label={BJUtilities.judge(props.dealersHand, props.playersHand)}
                className={classes.winOrLose}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Box className="arrow_box_common arrow_box_player" mt="20px">
        {props.playersHand.length !== 0 &&
          BJUtilities.getScoreForDisplay(props.playersHand)}
      </Box>
    </Box>
  );
}
