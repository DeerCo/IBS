import React, { useEffect } from 'react';
import {
  IconButton,
  ListItemText,
  Box,
  Divider,
  Stack,
  Typography,
  Tooltip,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import Scrollbar from '../../custom-scroll/Scrollbar';
import { fetchNotes, openNote, deleteNote, noteSearch } from '../../../redux/notes/Action';
import CustomTextField from '../../forms/custom-elements/CustomTextField';

const NoteList = () => {
  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.notesReducer.notesContent);
  const searchTerm = useSelector((state) => state.notesReducer.noteSearch);
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const filterNotes = (notes, nSearch) => {
    if (nSearch !== '')
      return notes.filter(
        (t) =>
          !t.deleted &&
          t.title.toLocaleLowerCase().concat(' ').includes(nSearch.toLocaleLowerCase()),
      );
    return notes.filter((t) => !t.deleted);
  };

  const notes = useSelector((state) =>
    filterNotes(state.notesReducer.notes, state.notesReducer.noteSearch),
  );

  return (
    <Box>
      <Box sx={{ p: '15px' }}>
        <CustomTextField
          id="search"
          value={searchTerm}
          placeholder="Search Notes"
          inputProps={{ 'aria-label': 'Search Notes' }}
          size="small"
          type="search"
          variant="outlined"
          fullWidth
          onChange={(e) => dispatch(noteSearch(e.target.value))}
        />
      </Box>
      <Divider />
      <Box sx={{ height: { lg: 'calc(100vh - 365px)', sm: '100vh' } }}>
        <Scrollbar>
          {notes && notes.length
            ? notes.map((note) => (
                <div key={note.id}>
                  <Box
                    p={2}
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                      backgroundColor: activeNote === note.id ? 'rgba(230,244,255,0.3)' : '',
                    }}
                    onClick={() => dispatch(openNote(note.id))}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '5px',
                        height: '100%',
                        left: 0,
                        top: 0,
                        backgroundColor:
                          note.color === 'secondary'
                            ? (theme) => theme.palette.secondary.main
                            : note.color === 'error'
                            ? (theme) => theme.palette.error.main
                            : note.color === 'warning'
                            ? (theme) => theme.palette.warning.main
                            : note.color === 'success'
                            ? (theme) => theme.palette.success.main
                            : note.color === 'primary'
                            ? (theme) => theme.palette.primary.main
                            : (theme) => theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="h5" sx={{ width: '240px' }} noWrap>
                      {note.title}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <ListItemText
                        secondary={new Date(note.datef).toLocaleDateString({
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                        })}
                      />
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          size="small"
                          sx={{ flexShrink: '0' }}
                          onClick={() => dispatch(deleteNote(note.id))}
                        >
                          <FeatherIcon icon="trash-2" width="16" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                  <Divider />
                </div>
              ))
            : 'No Notes Found'}
        </Scrollbar>
      </Box>
    </Box>
  );
};

export default NoteList;
