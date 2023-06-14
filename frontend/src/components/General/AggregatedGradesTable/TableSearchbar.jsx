import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
const TableSearchbar = (props) => {
    const { originalRows, setCurrRows, placeholder, width } = props;
    const [value, setValue] = React.useState('');

    // React.useEffect(() => {}, [value]);

    return (
        <Autocomplete
            freeSolo
            id="table-searchbar"
            disableClearable
            options={originalRows.map((option) => option.student)}
            onChange={(event, newValue) => {
                setCurrRows((prevState) => {
                    // We use original rows because prevState could've been changed from previous
                    // autocomplete
                    const newState = [];
                    if (Array.isArray(originalRows)) {
                        for (const studentObj of originalRows) {
                            if (studentObj.student === newValue) {
                                newState.push(studentObj);
                            }
                        }
                    }
                    console.log(newState);
                    return newState;
                });
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    placeholder={placeholder}
                    aria-label="Search Input"
                    inputProps={{ ...params.inputProps, type: 'search' }}
                />
            )}
            sx={{
                width: width
            }}
        />
    );
};

TableSearchbar.propTypes = {
    // Original rows which is fetched from backend (displays all possible rows)
    originalRows: PropTypes.arrayOf(PropTypes.object).isRequired,
    // setCurrRows useState callback function to set rows to be displayed on table
    setCurrRows: PropTypes.func.isRequired,
    // Placeholder text for the searchbar
    placeholder: PropTypes.string.isRequired,
    // Width of searchbar. Either string like '100%' or a numeric integer value.
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default TableSearchbar;
