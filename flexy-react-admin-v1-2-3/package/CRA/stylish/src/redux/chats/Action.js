import axios from 'axios';
import { SELECTED_CHAT, SEARCH_USER, MSG_SUBMIT, FETCH_CHAT_SUCCESS } from '../constants';

export const fetchChats = () => (dispatch) => {
  axios
    .get('/api/data/chat/ChatData')
    .then((response) => {
      dispatch({
        type: FETCH_CHAT_SUCCESS,
        chats: response.data,
      });
    })
    .catch((err) => err);
};

// ///////////////////////////////////////////
// Axios part Reducers
// //////////////////////////////////////////

export const fetchChatsSuccess = (chats) => ({
  type: FETCH_CHAT_SUCCESS,
  payload: chats,
});

export const openChat = (id) => ({
  type: SELECTED_CHAT,
  id,
});

export const chatSearch = (searchTerm) => ({
  type: SEARCH_USER,
  searchTerm,
});

export const sendMsg = (id, chatMsg) => ({
  type: MSG_SUBMIT,
  id,
  chatMsg,
});
