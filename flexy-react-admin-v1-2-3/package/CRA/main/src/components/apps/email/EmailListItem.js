import React from 'react';
import PropTypes from 'prop-types';
import { Box, ListItem, ListItemText, ListItemIcon, Chip, Typography } from '@mui/material';
import FeatherIcon from 'feather-icons-react';

import CustomCheckbox from '../../forms/custom-elements/CustomCheckbox';

const EmailListItem = ({
  id,
  onClick,
  onChange,
  onStar,
  onImportant,
  from,
  subject,
  time,
  label,
  starred,
  important,
  isSelected,
}) => (
  <ListItem button sx={{ mb: 1 }} selected={isSelected}>
    <ListItemIcon>
      <CustomCheckbox edge="start" id={`check${id}`} tabIndex={-1} onChange={onChange} />
    </ListItemIcon>
    <ListItemText onClick={onClick}>
      <Typography variant="h6" fontWeight="600">
        {from}
      </Typography>
      <Typography variant="body2" noWrap sx={{ maxWidth: { xl: '280px', xs: '100%' } }}>
        {subject}
      </Typography>
      <Box display="flex" alignItems="center" sx={{ mt: '3px' }}>
        <Chip
          label={label}
          sx={{ mr: 1, height: '21px' }}
          size="small"
          color={label === 'Promotional' ? 'primary' : label === 'Social' ? 'error' : 'success'}
        />
        <FeatherIcon
          icon="star"
          width="17"
          onClick={onStar}
          style={{ fill: starred ? '#FFC107' : '', marginRight: '5px' }}
        />
        <FeatherIcon
          icon="alert-circle"
          width="14"
          onClick={onImportant}
          style={{ fill: important ? '#ffc0bb' : '' }}
        />
        <Typography fontWeight="500" variant="caption" noWrap sx={{ ml: 'auto' }}>
          {time}
        </Typography>
      </Box>
    </ListItemText>
  </ListItem>
);

EmailListItem.propTypes = {
  id: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onStar: PropTypes.func.isRequired,
  onImportant: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  starred: PropTypes.bool.isRequired,
  important: PropTypes.bool.isRequired,
};

export default EmailListItem;
