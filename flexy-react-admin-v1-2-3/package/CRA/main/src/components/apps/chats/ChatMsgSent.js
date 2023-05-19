import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Box } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { sendMsg } from '../../../redux/chats/Action';
import CustomTextField from '../../forms/custom-elements/CustomTextField';

const ChatMsgSent = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const id = useSelector((state) => state.chatReducer.chatContent);
  const handleChatMsgChange = (e) => {
    setMsg(e.target.value);
  };

  const onChatMsgSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(sendMsg(id, msg));
    setMsg('');
  };

  return (
    <Box p={2}>
      <form onSubmit={onChatMsgSubmit.bind()} style={{ display: 'flex', alignItems: 'center' }}>
        <CustomTextField
          id="msg-sent"
          fullWidth
          value={msg}
          placeholder="Type a Message"
          size="small"
          type="text"
          variant="outlined"
          inputProps={{ 'aria-label': 'Type a Message' }}
          onChange={handleChatMsgChange.bind(null)}
        />
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => {
            dispatch(sendMsg(id, msg));
            setMsg('');
          }}
          disabled={!msg}
        >
          <FeatherIcon icon="send" width="18" />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatMsgSent;
