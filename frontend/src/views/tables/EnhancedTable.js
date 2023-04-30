import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Paper,
  IconButton,
  Tooltip,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import FeatherIcon from 'feather-icons-react';
import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../components/forms/custom-elements/CustomSwitch';
import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import img1 from '../../assets/images/users/1.jpg';
import img2 from '../../assets/images/users/2.jpg';
import img3 from '../../assets/images/users/3.jpg';
import img4 from '../../assets/images/users/4.jpg';
import img5 from '../../assets/images/users/5.jpg';

const rows = [
  {
    id: '1',
    imgsrc: img1,
    name: 'Sunil Joshi',
    email: 'sunil@gmail.com',
    pname: 'Elite Admin',
    teams: [
      {
        id: '1.1',
        color: 'secondary.main',
        text: 'S',
      },
      {
        id: '1.2',
        color: 'error.main',
        text: 'D',
      },
    ],
    status: 'Active',
    weeks: '11',
    budget: '3.9',
  },
  {
    id: '2',
    imgsrc: img2,
    name: 'Andrew McDownland',
    email: 'andrew@gmail.com',
    pname: 'Real Homes WP Theme',
    teams: [
      {
        id: '2.1',
        color: 'primary.main',
        text: 'A',
      },
      {
        id: '2.2',
        color: 'warning.main',
        text: 'X',
      },
      {
        id: '2.3',
        color: 'secondary.main',
        text: 'N',
      },
    ],
    status: 'Pending',
    weeks: '19',
    budget: '24.5',
  },
  {
    id: '3',
    imgsrc: img3,
    name: 'Christopher Jamil',
    email: 'jamil@gmail.com',
    pname: 'MedicalPro WP Theme',
    teams: [
      {
        id: '3.1',
        color: 'error.main',
        text: 'X',
      },
    ],
    status: 'Completed',
    weeks: '30',
    budget: '12.8',
  },
  {
    id: '4',
    imgsrc: img4,
    name: 'Nirav Joshi',
    email: 'nirav@gmail.com',
    pname: 'Hosting Press HTML',
    teams: [
      {
        id: '4.1',
        color: 'primary.main',
        text: 'Y',
      },
      {
        id: '4.2',
        color: 'error.main',
        text: 'X',
      },
    ],
    status: 'Active',
    weeks: '40',
    budget: '2.4',
  },
  {
    id: '5',
    imgsrc: img5,
    name: 'Micheal Doe',
    email: 'micheal@gmail.com',
    pname: 'Helping Hands WP Theme',
    teams: [
      {
        id: '5.1',
        color: 'secondary.main',
        text: 'S',
      },
    ],
    status: 'Cancel',
    weeks: '1',
    budget: '9.3',
  },
  {
    id: '6',
    imgsrc: img4,
    name: 'Nirav Joshi',
    email: 'nirav@gmail.com',
    pname: 'Hosting Press HTML',
    teams: [
      {
        id: '6.1',
        color: 'primary.main',
        text: 'Y',
      },
      {
        id: '6.2',
        color: 'error.main',
        text: 'X',
      },
    ],
    status: 'Active',
    weeks: '16',
    budget: '2.4',
  },
  {
    id: '7',
    imgsrc: img1,
    name: 'Sunil Joshi',
    email: 'sunil@gmail.com',
    pname: 'Elite Admin',
    teams: [
      {
        id: '7.1',
        color: 'secondary.main',
        text: 'S',
      },
      {
        id: '7.2',
        color: 'error.main',
        text: 'D',
      },
    ],
    status: 'Active',
    weeks: '12',
    budget: '3.9',
  },
  {
    id: '8',
    imgsrc: img2,
    name: 'Andrew McDownland',
    email: 'andrew@gmail.com',
    pname: 'Real Homes WP Theme',
    teams: [
      {
        id: '8.1',
        color: 'primary.main',
        text: 'A',
      },
      {
        id: '8.2',
        color: 'warning.main',
        text: 'X',
      },
      {
        id: '8.3',
        color: 'secondary.main',
        text: 'N',
      },
    ],
    status: 'Pending',
    weeks: '14',
    budget: '24.5',
  },
  {
    id: '9',
    imgsrc: img3,
    name: 'Christopher Jamil',
    email: 'jamil@gmail.com',
    pname: 'MedicalPro WP Theme',
    teams: [
      {
        id: '9.1',
        color: 'error.main',
        text: 'X',
      },
    ],
    status: 'Completed',
    weeks: '12',
    budget: '12.8',
  },

  {
    id: '10',
    imgsrc: img5,
    name: 'Micheal Doe',
    email: 'micheal@gmail.com',
    pname: 'Helping Hands WP Theme',
    teams: [
      {
        id: '10.1',
        color: 'secondary.main',
        text: 'S',
      },
    ],
    status: 'Cancel',
    weeks: '9',
    budget: '9.3',
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Team Lead',
  },
  {
    id: 'pname',
    numeric: false,
    disablePadding: false,
    label: 'Project Name',
  },
  {
    id: 'team',
    numeric: false,
    disablePadding: false,
    label: 'Team',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'weeks',
    numeric: false,
    disablePadding: false,
    label: 'Weeks',
  },
  {
    id: 'budget',
    numeric: false,
    disablePadding: false,
    label: 'Budget',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputprops={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="subtitle1" fontWeight="500">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Filter
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <FeatherIcon icon="trash-2" width="18" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FeatherIcon icon="filter" width="18" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Enhanced Table',
  },
];

const EnhancedTable = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <PageContainer title="Enhanced Table" description="this is Enhanced Table page">
      {/* breadcrumb */}
      <Breadcrumb title="Enhanced Table" items={BCrumb} />
      {/* end breadcrumb */}
      <Card>
        <CardContent>
          <Box>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <CustomCheckbox
                                color="primary"
                                checked={isItemSelected}
                                inputprops={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Avatar
                                  src={row.imgsrc}
                                  alt={row.imgsrc}
                                  width="35"
                                  sx={{
                                    borderRadius: '100%',
                                  }}
                                />
                                <Box
                                  sx={{
                                    ml: 2,
                                  }}
                                >
                                  <Typography variant="h6" fontWeight="600">
                                    {row.name}
                                  </Typography>
                                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                                    {row.email}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="h6" fontWeight="400">
                                {row.pname}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                {row.teams.map((team) => (
                                  <Avatar
                                    key={team.id}
                                    sx={{
                                      backgroundColor: team.color,
                                      width: '35px',
                                      height: '35px',
                                      color: '#fff',
                                      ml: '-8px',
                                    }}
                                  >
                                    {team.text}
                                  </Avatar>
                                ))}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Box
                                  sx={{
                                    backgroundColor:
                                      row.status === 'Active'
                                        ? (theme) => theme.palette.success.main
                                        : row.status === 'Pending'
                                        ? (theme) => theme.palette.warning.main
                                        : row.status === 'Completed'
                                        ? (theme) => theme.palette.primary.main
                                        : row.status === 'Cancel'
                                        ? (theme) => theme.palette.error.main
                                        : (theme) => theme.palette.secondary.main,
                                    borderRadius: '100%',
                                    height: '10px',
                                    width: '10px',
                                  }}
                                />
                                <Typography
                                  color="textSecondary"
                                  variant="body1"
                                  fontWeight="400"
                                  sx={{
                                    ml: 1,
                                  }}
                                >
                                  {row.status}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography color="textSecondary" variant="body1" fontWeight="400">
                                {row.weeks}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">${row.budget}k</Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default EnhancedTable;
