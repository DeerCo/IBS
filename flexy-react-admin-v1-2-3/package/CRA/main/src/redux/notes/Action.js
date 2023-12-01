import axios from 'axios';
import {
  SELECTED_NOTES,
  SEARCH_NOTES,
  UPDATE_NOTE,
  DELETE_NOTE,
  ADD_NOTE,
  FETCH_NOTES_SUCCESS,
} from '../constants';

export const fetchNotes = () => (dispatch) => {
  axios
    .get('/api/data/notes/NotesData')
    .then((response) => {
      dispatch({
        type: FETCH_NOTES_SUCCESS,
        notes: response.data,
      });
    })
    .catch((err) => err);
};

export const openNote = (id) => ({
  type: SELECTED_NOTES,
  id,
});

export const noteSearch = (searchTerm) => ({
  type: SEARCH_NOTES,
  searchTerm,
});
export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  id,
});
export const updateNote = (id, field, value) => ({
  type: UPDATE_NOTE,
  id,
  field,
  value,
});

export const addNote = (id) => ({
  type: ADD_NOTE,
  // eslint-disable-next-line no-param-reassign
  id: id++,
  color: (theme) => theme.palette.primary.main,
  title: 'This is new Note',
});
