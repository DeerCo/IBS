import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import DownloadSubmissionButton from './DownloadSubmissionButton';
import CollectSubmissionButton from './CollectSubmissionButton';

const useStyles = makeStyles({

  button: {
    width: '40%'
  },
  menu: {
    padding: '16px',
    borderRadius: '20px'
  },
  mitem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px'
  },

});

const SubmissionsMenu = ({ course_id, task }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        className={classes.button}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        size="small"
      >
        Submissions
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PopoverClasses={classes.menu}
        className={classes.menu}
        sx={{
          padding: '16px',
          borderRadius: '20px'
        }}
      >
        <MenuItem className={classes.mitem}>
          <CollectSubmissionButton course_id={course_id} task={task} />
        </MenuItem>
        <MenuItem className={classes.mitem}>
          <DownloadSubmissionButton course_id={course_id} task={task} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default SubmissionsMenu;
