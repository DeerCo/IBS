import * as React from 'react';
import PropTypes from 'prop-types';
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
    Paper,
    FormControlLabel,
    Card,
    CardContent,
    Typography,
    IconButton,
    Tooltip,
    Toolbar
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CustomCheckbox from '../../FlexyMainComponents/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../FlexyMainComponents/forms/custom-elements/CustomSwitch';
import FeatherIcon from 'feather-icons-react';
import { alpha } from '@mui/material/styles';
import StaffApi from '../../../api/staff_api';
import { toast } from 'react-toastify';

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

function TaskGroupTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
        props;
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

TaskGroupTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array.isRequired
};

const TaskGroupTableToolbar = (props) => {
    const { numSelected, selectedObj, courseId, alerts } = props;

    const DeleteTaskGroup = () => {
        if (Array.isArray(selectedObj.selected)) {
            Promise.all(
                selectedObj.selected.map((selectedId) =>
                    StaffApi.deleteTaskGroup(courseId, selectedId).then((res) => {
                        toast.info(`Deleted task group ${selectedId}`, { theme: 'colored' });
                    })
                )
            ).then(() => {
                // Refresh/reload the selected state
                selectedObj.setSelected([]);
                // Let TaskGroupPage (parent) component know to refresh the data in table
                alerts.setAlert(true);
            });
        }
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle2"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Filter
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip
                    title="Delete"
                    onClick={() => {
                        DeleteTaskGroup();
                    }}
                >
                    <IconButton>
                        <FeatherIcon icon="trash-2" width="18" />
                    </IconButton>
                </Tooltip>
            ) : (
                <></>
            )}
        </Toolbar>
    );
};

TaskGroupTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedObj: PropTypes.object.isRequired,
    courseId: PropTypes.string.isRequired,
    alerts: PropTypes.object.isRequired
};

const TaskGroupTable = ({ headCells, rows, courseId, alerts }) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('taskGroupId');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // For testing purposes
    // React.useEffect(() => {
    //     console.log(selected);
    // }, [selected]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.taskGroupId);
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
                selected.slice(selectedIndex + 1)
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
        <>
            <Paper sx={{ width: '100%', mb: 2, mt: 1 }}>
                <TaskGroupTableToolbar
                    numSelected={selected.length}
                    selectedObj={{ selected, setSelected }}
                    courseId={courseId}
                    alerts={alerts}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <TaskGroupTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.taskGroupId);
                                    const labelId = `grades-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.taskGroupId)}
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
                                                        'aria-labelledby': labelId
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" alignItems="center">
                                                    <Box>
                                                        <Typography variant="h6" fontWeight="600">
                                                            {row.taskGroupId}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="h6"
                                                    fontWeight="400"
                                                >
                                                    {row.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="h6"
                                                    fontWeight="400"
                                                >
                                                    {row.maxTokens}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
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
                    // For correcting offset in text for "Rows per page:" and "1-5 of 5"
                    sx={{
                        '.MuiTablePagination-displayedRows': {
                            'margin-top': '0.5em',
                            'margin-bottom': '1em'
                        },
                        '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel': {
                            'margin-top': '1em',
                            'margin-bottom': '1em'
                        }
                    }}
                />
            </Paper>
            <FormControlLabel
                control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </>
    );
};

TaskGroupTable.propTypes = {
    // Must be in form of { id: string, numeric: boolean, disablePadding: boolean, label: string }
    headCells: PropTypes.array.isRequired,
    // Must be in form of { id: string, taskGroupId: string, maxTokens: string }
    rows: PropTypes.array.isRequired,
    // Course ID from useParams
    courseId: PropTypes.string.isRequired,
    // setAlert hook for reloading data in table
    alerts: PropTypes.object.isRequired
};

export default TaskGroupTable;
