<<<<<<< HEAD
import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "../hooks/useStyles";

export default function Message(props) {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h3" className={classes.message}>
        {props.children.map((line, index) => (
          <Box key={index}>{line}</Box>
        ))}
      </Typography>
    </Box>
  );
}
=======
import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "../hooks/useStyles";

export default function Message(props) {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h3" className={classes.message}>
        {props.children.map((line, index) => (
          <Box key={index}>{line}</Box>
        ))}
      </Typography>
    </Box>
  );
}
>>>>>>> 7ec37440df49fb67471bcb2a3b5f0343725826c5
