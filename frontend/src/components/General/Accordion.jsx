import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const useStyles = makeStyles({
  accordion: {
    marginTop: '16px',
  },
  accordionTitle: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '16px',
  },
});

let Accordion = (props) => {
  const classes = useStyles();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={classes.accordion}>
      <div className={classes.accordionTitle}
        onClick={() => setIsActive(!isActive)}>
        <strong >
          {props.title}
        </strong>
        <div>
          {isActive ? <ExpandLessIcon htmlColor="darkred" /> : <ExpandMoreIcon htmlColor="blue" />}
        </div>
      </div>
      {isActive && props.content}
    </div>
  );
};


export default Accordion;