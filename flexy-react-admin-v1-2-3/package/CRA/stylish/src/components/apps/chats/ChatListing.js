import React, { useEffect } from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Scrollbar from '../../custom-scroll/Scrollbar';
import CustomTextField from '../../forms/custom-elements/CustomTextField';
import { openChat, fetchChats, chatSearch } from '../../../redux/chats/Action';

const ChatListing = () => {
  const dispatch = useDispatch();
  const activeChat = useSelector((state) => state.chatReducer.chatContent);
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const filterChats = (chats, cSearch) => {
    if (chats)
      return chats.filter((t) => t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()));
    return chats;
  };

  const chats = useSelector((state) =>
    filterChats(state.chatReducer.chats, state.chatReducer.chatSearch),
  );
  return (
    <div>
      <Box
        p={2}
        sx={{
          pt: '21px',
          pb: '21px',
        }}
      >
        <CustomTextField
          id="outlined-search"
          placeholder="Search contacts"
          size="small"
          type="search"
          variant="outlined"
          inputProps={{ 'aria-label': 'Search Contacts' }}
          fullWidth
          onChange={(e) => dispatch(chatSearch(e.target.value))}
        />
      </Box>
      <Divider />
      <List sx={{ height: { lg: 'calc(100vh - 365px)', sm: '100vh' }, p: 1 }}>
        <Scrollbar>
          {chats.map((chat) => (
            <ListItem
              button
              alignItems="flex-start"
              key={chat.id}
              onClick={() => dispatch(openChat(chat.id))}
              selected={activeChat === chat.id}
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={chat.thumb} />
              </ListItemAvatar>
              <ListItemText primary={chat.name} secondary={chat.excerpt} />
            </ListItem>
          ))}
        </Scrollbar>
      </List>
    </div>
  );
};

export default ChatListing;
