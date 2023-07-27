import React from "react";
import { Table, TableBody, TableCell, TableRow, TableHead, Chip, Typography } from '@mui/material';



let MarkSummary = (props) => {
  let marks = props.marks;
  let total_mark = 0;
  let total_out_of = 0;

  for (let mark in marks) {
    total_mark += marks[mark].mark;
    total_out_of += marks[mark].out_of;
  }

  if (Object.keys(marks).length > 0) {
    return (
      <Table aria-label="Marks table">
        <TableHead>
          <TableRow>
            <TableCell>
              Criteria
            </TableCell>
            <TableCell align="right">
              Your Mark
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(marks).map((mark) => (
            <TableRow>
              <TableCell>
                {mark}
              </TableCell>
              <TableCell align="right">
                <Chip label={`${marks[mark].mark} / ${marks[mark].out_of}`} variant="outlined" color="primary" />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              Total Mark
            </TableCell>
            <TableCell align="right">
              <Chip label={`${total_mark} / ${total_out_of}`} color="primary" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  } else {
    return (
      <div>
        <Typography>
          No mark is available yet.
        </Typography>
      </div>
    );
  }
};


export default MarkSummary;