import { OPEN_EMAIL } from '../constants';

const EmailContent = (state = 1, action = '1') => {
  switch (action.type) {
    case OPEN_EMAIL:
      return action.id;
    default:
      return state;
  }
};

export default EmailContent;
