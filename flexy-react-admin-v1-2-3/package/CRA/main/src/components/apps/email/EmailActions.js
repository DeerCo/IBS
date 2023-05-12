import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, ButtonGroup, Menu, MenuItem } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { trashEmail, assignFolder } from '../../../redux/email/Action';

const EmailActions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = useSelector((state) => state.emailReducer.selectedEmail);
  const dispatch = useDispatch();

  return (
    <Box sx={{ p: 2 }}>
      <ButtonGroup size="small" aria-label="small button group" fullWidth>
        <Button key="one" onClick={() => dispatch(trashEmail(id))}>
          <FeatherIcon icon="trash" width="17" />
        </Button>
        <Button key="two" onClick={handleClick}>
          <FeatherIcon icon="folder" width="17" />
        </Button>
        <Button key="three">
          <FeatherIcon icon="tag" width="17" />
        </Button>
      </ButtonGroup>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ [`& .MuiPaper-root`]: { minWidth: 100 } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => dispatch(assignFolder(id, 'inbox'))}>Inbox</MenuItem>
        <MenuItem onClick={() => dispatch(assignFolder(id, 'sent'))}>Sent</MenuItem>
        <MenuItem onClick={() => dispatch(assignFolder(id, 'draft'))}>Draft</MenuItem>
        <MenuItem onClick={() => dispatch(assignFolder(id, 'spam'))}>Spam</MenuItem>
        <MenuItem onClick={() => dispatch(assignFolder(id, 'trash'))}>Trash</MenuItem>
      </Menu>
    </Box>
  );
};

export default EmailActions;
