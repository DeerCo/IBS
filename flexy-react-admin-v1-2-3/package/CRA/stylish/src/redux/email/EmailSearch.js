import { FILTER_EMAIL, SET_EMAIL_VISIBILITY_FILTER } from '../constants';

const EmailSearch = (state = '', action) => {
  switch (action.type) {
    case FILTER_EMAIL:
      return action.searchTerm;
    case SET_EMAIL_VISIBILITY_FILTER:
      return state;
    default:
      return state;
  }
};

export default EmailSearch;
