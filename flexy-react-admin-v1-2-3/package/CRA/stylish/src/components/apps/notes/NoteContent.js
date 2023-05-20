import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Divider, Fab, Button } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { updateNote, addNote } from '../../../redux/notes/Action';
import CustomTextField from '../../forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../forms/custom-elements/CustomFormLabel';

const NoteContent = ({ toggleNoteSidebar }) => {
  const noteDetails = useSelector(
    (state) => state.notesReducer.notes[state.notesReducer.notesContent - 1],
  );
  let title;
  let color;
  const id = useSelector((state) => state.notesReducer.notes.length + 1);
  const dispatch = useDispatch();
  const colorvariation = [
    {
      lineColor: '#fdc90f',
      disp: 'warning',
    },
    {
      lineColor: '#1a97f5',
      disp: 'primary',
    },
    {
      lineColor: '#fc4b6c',
      disp: 'error',
    },
    {
      lineColor: '#39cb7f',
      disp: 'success',
    },
    {
      lineColor: '#1e4db7',
      disp: 'secondary',
    },
  ];
  return (
    <Box>
      <Box display="flex" alignItems="center" p={2}>
        <Box sx={{ display: { xs: 'block', md: 'block', lg: 'none' }, mr: '10px' }}>
          <FeatherIcon icon="menu" width="18" onClick={toggleNoteSidebar} />
        </Box>
        <input
          style={{ display: 'none' }}
          type="text"
          name="title"
          id="title"
          ref={(node) => {
            title = node;
          }}
        />
        <input
          style={{ display: 'none' }}
          type="text"
          name="color"
          id="color"
          ref={(node) => {
            color = node;
          }}
        />
        <Button
          variant="contained"
          disableElevation
          color="primary"
          style={{ marginLeft: 'auto' }}
          onClick={(e) => {
            e.preventDefault();
            dispatch(addNote(id, title.value, color.value));
            title.value = '';
            color.value = '#1a97f5';
          }}
        >
          Add Notes
        </Button>
      </Box>
      <Divider />
      {noteDetails && noteDetails.deleted === false ? (
        <Box p={2}>
          <CustomFormLabel htmlFor="outlined-multiline-static">Edit Note</CustomFormLabel>
          <CustomTextField
            id="outlined-multiline-static"
            placeholder="Edit Note"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            value={noteDetails.title}
            onChange={(e) => dispatch(updateNote(noteDetails.id, 'title', e.target.value))}
          />
          <br />
          <CustomFormLabel htmlFor="demo-simple-select-label">Change Note Color</CustomFormLabel>

          {colorvariation.map((color1) => (
            <Fab
              color="primary"
              style={{ backgroundColor: color1.lineColor }}
              sx={{ marginRight: '3px' }}
              size="small"
              key={color1.disp}
              onClick={() => dispatch(updateNote(noteDetails.id, 'color', color1.disp))}
            >
              {noteDetails.color === color1.disp ? <FeatherIcon icon="check" size="16" /> : ''}
            </Fab>
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', fontSize: '24px', mt: 2 }}>Select a Note</Box>
      )}
    </Box>
  );
};

NoteContent.propTypes = {
  toggleNoteSidebar: PropTypes.func,
};

export default NoteContent;
