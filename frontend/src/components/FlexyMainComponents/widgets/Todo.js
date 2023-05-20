import React from 'react';
import { Box, Typography, Card, CardContent, FormGroup, FormControlLabel } from '@mui/material';
import CustomCheckbox from '../forms/custom-elements/CustomCheckbox';
import WidgetCard from '../base-card/WidgetCard';

const todos = [
  {
    id: '1',
    color: '#1e4db7',
    title: 'Give purchase report to john',
    subtitle: '2 January 2021',
  },
  {
    id: '2',
    color: '#fc4b6c',
    title: 'Hit the gym',
    subtitle: '5 January 2021',
  },
  {
    id: '3',
    color: '#fec90f',
    title: 'Pay bills',
    subtitle: '12 January 2021',
  },
  {
    id: '4',
    color: '#39cb7f',
    title: 'Meet George',
    subtitle: '15 January 2021',
  },
  {
    id: '5',
    color: '#0bb2fb',
    title: 'Read a book',
    subtitle: '20 January 2021',
  },
];

const Todo = () => {
  return (
    <Card
      sx={{
        pb: 0,
        mb: 4,
      }}
    >
      <CardContent
        sx={{
          pb: 0,
        }}
      >
        <WidgetCard title="Todo List" />

        {todos.map((todo) => (
          <Box
            key={todo.id}
            sx={{
              pb: 2,
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <CustomCheckbox bgcolor={todo.color} inputprops={{ 'aria-label': 'checkbox' }} />
                }
                label={todo.title}
              />
            </FormGroup>

            <Box
              sx={{
                ml: '30px',
                mt: -1,
              }}
            >
              <Typography color="textSecondary" variant="caption" fontWeight="400">
                {todo.subtitle}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default Todo;
