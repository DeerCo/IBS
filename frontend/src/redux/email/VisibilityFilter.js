import { SET_EMAIL_VISIBILITY_FILTER } from '../constants';
import { EmailVisibilityFilters } from './Action';

const VisibilityFilter = (state = EmailVisibilityFilters.SHOW_INBOX, action) => {
  switch (action.type) {
    case SET_EMAIL_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default VisibilityFilter;
