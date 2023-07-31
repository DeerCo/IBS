import InstructorApi from '../../../../api/instructor_api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

const MarkPublicationDialog = ({ courseId, task, open, setOpen, release }) => {

  const release_marks = () => {
    InstructorApi.releasMarks(courseId, task)
      .then((res) => res.data)
      .then((data) => {
        toast.success('Marks are released Successfully.', { theme: 'colored' });
        mutate('/mark/is_hidden' + task);
      })
      .catch((err) =>
        toast.error('Failed to published mark. Try again.', {
          theme: 'colored'
        })
      );
  };
  const hide_marks = () => {
    InstructorApi.hideMarks(courseId, task)
      .then((res) => res.data)
      .then((data) => {
        toast.success('Marks are hidden Successfully.', { theme: 'colored' });
        mutate('/mark/is_hidden' + task);
      })
      .catch((err) =>
        toast.error('Failed to released mark. Try again.', {
          theme: 'colored'
        })
      );
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="release-confirmation-dialog"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          padding: '8px'
        },
      }}
    >
      <DialogContent>
        Are You Sure You Want to {release ? 'Release' : 'Hide'} Marks for Task {task}?
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="error"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            release ? release_marks() : hide_marks();
          }}
          color="primary"
        >
          {release ? 'Release' : 'Hide'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MarkPublicationDialog;
