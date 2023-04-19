import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from '@mui/material';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    boxShadow: '0px 2px 10px 1px #e6e9ed',
    flexDirection: 'column',
    margin: '32px',
    borderRadius: '15px 15px 15px 15px',
    padding: '12px 8px 12px 8px'
  },
  title: {
    textAlign: 'center',
    borderBottom: 'solid ghostwhite',
    padding: '0 16px 8px 16px',
  },
});

let Card = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.card} key={props.title}>
      <div className={classes.title}>
        <Typography variant="h5">
          {props.title}
        </Typography>
      </div>
      {props.child}
    </div>
  );
};


export default Card;