import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, createTheme } from '@mui/material/styles';
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
    Container
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import FeatherIcon from 'feather-icons-react';
import CustomCheckbox from '../../FlexyMainComponents/forms/custom-elements/CustomCheckbox';
import CustomSwitch from '../../FlexyMainComponents/forms/custom-elements/CustomSwitch';
import TableSearchbar from './TableSearchbar';

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

function AggregatedGradesTableHead(props) {
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
                        {headCell.id !== 'finalGrade' ? (
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
                                        {order === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            <Typography variant="subtitle1" fontWeight="500">
                                {headCell.label}
                            </Typography>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

AggregatedGradesTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array.isRequired
};

const AggregatedGradesTableToolbar = (props) => {
    const { originalRows, setCurrRows } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 }
            }}
        >
            {originalRows.length > 0 && (
                <TableSearchbar
                    originalRows={originalRows}
                    setCurrRows={setCurrRows}
                    placeholder="Search for student"
                    width="20vw"
                />
            )}
        </Toolbar>
    );
};

AggregatedGradesTableToolbar.propTypes = {
    // Original rows that are fetched from backend API call
    originalRows: PropTypes.arrayOf(PropTypes.object).isRequired,
    // To set the current state of rows
    setCurrRows: PropTypes.func.isRequired
};

const AggregatedGradesTable = ({ headCells, rows, tableWidth, courseId }) => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('student');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [currRows, setCurrRows] = React.useState(rows === undefined ? [] : rows);

    React.useEffect(() => {
        setCurrRows(rows);
        console.log(rows);
    }, [rows]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = currRows.map((n) => n.student);
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
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - currRows.length) : 0;

    return (
        <Card sx={{ width: tableWidth }}>
            <CardContent>
                <Box>
                    <Paper sx={{ width: '100%', mb: 2, mt: 1 }}>
                        <AggregatedGradesTableToolbar
                            originalRows={rows}
                            setCurrRows={setCurrRows}
                        />
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <AggregatedGradesTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={currRows.length}
                                    headCells={headCells}
                                />
                                <TableBody>
                                    {stableSort(currRows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.student);
                                            const labelId = `grades-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) =>
                                                        handleClick(event, row.student)
                                                    }
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
                                                                <Typography
                                                                    variant="h6"
                                                                    fontWeight="600"
                                                                >
                                                                    {row.student}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    {headCells.map(
                                                        (jsonObj) =>
                                                            jsonObj.id !== 'student' && (
                                                                <TableCell
                                                                    key={`${row.id}-${jsonObj.id}-tbCell`}
                                                                >
                                                                    <Typography
                                                                        color="textSecondary"
                                                                        variant="h6"
                                                                        fontWeight="400"
                                                                        key={`${row.id}-${jsonObj.id}-typography`}
                                                                    >
                                                                        {row[jsonObj.id]}
                                                                    </Typography>
                                                                </TableCell>
                                                            )
                                                    )}
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
                            count={currRows.length}
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
                                '.MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel':
                                    {
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
                </Box>
            </CardContent>
        </Card>
    );
};

AggregatedGradesTable.propTypes = {
    // Must be in form of { id: string, numeric: boolean, disablePadding: boolean, label: string }
    headCells: PropTypes.array.isRequired,
    // Must be in form of { id: string, student: string, <taskName>: string }
    rows: PropTypes.array.isRequired,
    // Adjust width of table
    tableWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default AggregatedGradesTable;
