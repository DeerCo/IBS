import React, { useState } from 'react';
import {
  List,
  Divider,
  Button,
  Box,
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import FilterEmail from './FilterEmail';
import { EmailVisibilityFilters } from '../../../redux/email/Action';
import CustomTextField from '../../forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../forms/custom-elements/CustomFormLabel';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const EmailSidebar = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box sx={{ p: 2, paddingBottom: '18px' }}>
        <Button variant="contained" fullWidth color="error" onClick={handleClickOpen}>
          Compose
        </Button>
      </Box>
      <Divider />

      <List sx={{ p: 1 }}>
        <FilterEmail icon="inbox" text="Inbox" filter={EmailVisibilityFilters.SHOW_INBOX} />
        <FilterEmail icon="send" text="Sent" filter={EmailVisibilityFilters.SHOW_SENT} />
        <FilterEmail icon="archive" text="Draft" filter={EmailVisibilityFilters.SHOW_SPAM} />
        <FilterEmail icon="flag" text="Spam" filter={EmailVisibilityFilters.SHOW_DRAFTS} />
        <FilterEmail icon="trash" text="Trash" filter={EmailVisibilityFilters.SHOW_TRASH} />
      </List>

      <Divider />

      <List sx={{ p: 1 }}>
        <FilterEmail icon="star" text="Starred" filter={EmailVisibilityFilters.SHOW_STARRED} />
        <FilterEmail
          icon="alert-circle"
          text="Important"
          filter={EmailVisibilityFilters.SHOW_IMPORTANT}
        />
      </List>

      <Divider />

      <List sx={{ p: 1 }}>
        <FilterEmail
          icon="disc"
          text="Promotional"
          filter={EmailVisibilityFilters.SHOW_PROMOTIONAL}
        />
        <FilterEmail icon="disc" text="Social" filter={EmailVisibilityFilters.SHOW_SOCIAL} />
        <FilterEmail icon="disc" text="Health" filter={EmailVisibilityFilters.SHOW_HEALTH} />
      </List>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" variant="h4">
          Compose Mail
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" component="div">
            <CustomFormLabel htmlFor="to-text">To</CustomFormLabel>
            <CustomTextField id="to-text" fullWidth size="small" variant="outlined" />
            <CustomFormLabel htmlFor="subject-text">Subject</CustomFormLabel>
            <CustomTextField id="subject-text" fullWidth size="small" variant="outlined" />
            <CustomFormLabel htmlFor="message-text">Message</CustomFormLabel>
            <CustomTextField
              id="message-text"
              placeholder="Write a message"
              multiline
              fullWidth
              rows={4}
              variant="outlined"
            />
            <CustomFormLabel htmlFor="upload-text">Attachment</CustomFormLabel>
            <CustomTextField
              type="file"
              autoFocus
              id="upload-text"
              fullWidth
              size="small"
              variant="outlined"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Send
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmailSidebar;
