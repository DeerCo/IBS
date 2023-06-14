import PropTypes from 'prop-types';
import { Autocomplete, Stack, TextField } from '@mui/material';
const TableSearchbar = (props) => {
    const { rows, placeholder, width } = props;
    return (
        <Autocomplete
            freeSolo
            id="table-searchbar"
            disableClearable
            options={rows.map((option) => option.student)}
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
    // Rows for autocomplete (from table rows). Must be array of { ..., student: string }
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    // Placeholder text for the searchbar
    placeholder: PropTypes.string.isRequired,
    // Width of searchbar. Either string like '100%' or a numeric integer value.
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default TableSearchbar;
