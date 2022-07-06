import React, { useEffect } from "react";
import { Box, Button } from "@material-ui/core";

export default function GameProgressButton(props) {
  useEffect(() => {
    function click(event) {
      if (event.key === "Enter") {
        props.onClickNext();
      } else if (!props.isTheLastGame && event.key === "n") {
        props.onClickNext();
      } else if (props.isTheLastGame && event.key === "f") {
        props.onClickNext();
      } else {
        event.preventDefault();
      }
    }
    document.body.addEventListener("keydown", click, {
      passive: true
    });
    return () => {
      document.body.removeEventListener("keydown", click, {
        passive: true
      });
    };
  }, []);

  return (
    <Box mt={1}>
      <Button variant="contained" onClick={props.onClickNext}>
        {props.isTheLastGame ? "FINISH" : "NEXT"}
      </Button>
    </Box>
  );
}
