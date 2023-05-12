import { TRASH_EMAIL, ASSIGN_FOLDER, ASSIGN_LABEL, SET_SELECTED_EMAIL } from '../constants';

const SelectedEmail = (state = [], action) => {
  switch (action.type) {
    case SET_SELECTED_EMAIL:
      if (action.checkStatus === 'checked') return state.concat(action.id);
      return state.filter((t) => t !== action.id);
    case TRASH_EMAIL:
      return state;
    case ASSIGN_FOLDER:
      return state;
    case ASSIGN_LABEL:
      return state;
    default:
      return state;
  }
};

export default SelectedEmail;
