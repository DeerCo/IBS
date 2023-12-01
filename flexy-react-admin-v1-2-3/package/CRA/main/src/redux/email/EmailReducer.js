import { combineReducers } from 'redux';
import Emails from './Emails';
import visibilityFilter from './VisibilityFilter';
import selectedEmail from './SelectedEmail';
import emailSearch from './EmailSearch';
import emailContent from './EmailContent';

const EmailReducer = combineReducers({
  Emails,
  visibilityFilter,
  selectedEmail,
  emailSearch,
  emailContent,
});

export default EmailReducer;
