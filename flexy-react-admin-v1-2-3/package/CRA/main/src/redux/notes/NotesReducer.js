import {
  SELECTED_NOTES,
  SEARCH_NOTES,
  UPDATE_NOTE,
  DELETE_NOTE,
  ADD_NOTE,
  FETCH_NOTES_SUCCESS,
} from '../constants';

const INIT_STATE = {
  notes: [],
  notesContent: 1,
  noteSearch: '',
};

const NotesReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.notes,
      };

    case SELECTED_NOTES:
      return {
        ...state,
        notesContent: action.id,
      };

    case SEARCH_NOTES:
      return {
        ...state,
        noteSearch: action.searchTerm,
      };

    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.id ? { ...note, [action.field]: action.value } : note,
        ),
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.id ? { ...note, deleted: !note.deleted } : note,
        ),
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            // eslint-disable-next-line no-param-reassign
            id: action.id++,
            title: action.title,
            color: action.color,
            datef: new Date(),
            deleted: false,
          },
        ],
      };

    default:
      return state;
  }
};

export default NotesReducer;
