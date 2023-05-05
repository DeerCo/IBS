import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListItemText, ListItem, ListItemIcon } from '@mui/material';
import PropTypes from 'prop-types';
import FeatherIcon from 'feather-icons-react';
import { setEmailVisibilityFilter } from '../../../redux/email/Action';

const FilterEmail = ({ filter, icon, text }) => {
  const active = useSelector((state) => filter === state.emailReducer.visibilityFilter);

  const dispatch = useDispatch();

  return (
    <ListItem
      sx={{ mb: 1 }}
      button
      onClick={() => dispatch(setEmailVisibilityFilter(filter))}
      selected={active}
    >
      <ListItemIcon sx={{ minWidth: '30px' }}>
        <FeatherIcon icon={icon} width="20" />
      </ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  );
};

FilterEmail.propTypes = {
  filter: PropTypes.any,
  icon: PropTypes.node,
  text: PropTypes.string,
};

export default FilterEmail;
