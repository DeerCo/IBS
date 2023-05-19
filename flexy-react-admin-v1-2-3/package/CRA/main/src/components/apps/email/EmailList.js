import React from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import EmailListItem from './EmailListItem';
import {
  EmailVisibilityFilters,
  openEmail,
  setSelectedEmail,
  starEmail,
  importantEmail,
} from '../../../redux/email/Action';

const EmailList = ({ showrightSidebar }) => {
  const getVisibleEmails = (emails, filter, emailSearch) => {
    switch (filter) {
      case EmailVisibilityFilters.SHOW_INBOX:
        return emails.filter(
          (t) =>
            t.inbox &&
            !t.trash &&
            t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      case EmailVisibilityFilters.SHOW_SENT:
        return emails.filter(
          (t) =>
            t.sent &&
            !t.trash &&
            t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      case EmailVisibilityFilters.SHOW_DRAFTS:
        return emails.filter(
          (t) =>
            t.draft &&
            !t.trash &&
            t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      case EmailVisibilityFilters.SHOW_SPAM:
        return emails.filter(
          (t) =>
            t.spam &&
            !t.trash &&
            t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      case EmailVisibilityFilters.SHOW_TRASH:
        return emails.filter(
          (t) => t.trash && t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      case EmailVisibilityFilters.SHOW_STARRED:
        return emails.filter(
          (t) =>
            t.starred &&
            !t.trash &&
            t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      case EmailVisibilityFilters.SHOW_IMPORTANT:
        return emails.filter(
          (t) =>
            t.important &&
            !t.trash &&
            t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      case EmailVisibilityFilters.SHOW_PROMOTIONAL:
        return emails.filter(
          (t) =>
            t.label === 'Promotional' &&
            !t.trash &&
            t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      case EmailVisibilityFilters.SHOW_SOCIAL:
        return emails.filter(
          (t) =>
            t.label === 'Social' &&
            !t.trash &&
            t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      case EmailVisibilityFilters.SHOW_HEALTH:
        return emails.filter(
          (t) =>
            t.label === 'Health' &&
            !t.trash &&
            t.from.toLocaleLowerCase().includes(emailSearch.toLocaleLowerCase()),
        );
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const emails = getVisibleEmails(
    useSelector((state) => state.emailReducer.Emails),
    useSelector((state) => state.emailReducer.visibilityFilter),
    useSelector((state) => state.emailReducer.emailSearch),
  );

  const active = useSelector((state) => state.emailReducer.emailContent);
  const dispatch = useDispatch();

  return (
    <List sx={{ p: 1 }}>
      {emails.map((email) => (
        <EmailListItem
          key={email.id}
          active={active}
          {...email}
          onClick={() => {
            dispatch(openEmail(email.id));
            showrightSidebar();
          }}
          isSelected={email.id === active}
          onStar={() => dispatch(starEmail(email.id))}
          onImportant={() => dispatch(importantEmail(email.id))}
          onChange={(e) => {
            if (e.target.checked === true) dispatch(setSelectedEmail(email.id, 'checked'));
            else dispatch(setSelectedEmail(email.id, 'unchecked'));
          }}
        />
      ))}
    </List>
  );
};

EmailList.propTypes = {
  showrightSidebar: PropTypes.func.isRequired,
};

export default EmailList;
