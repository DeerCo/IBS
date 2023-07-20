import React from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material';

const UploadMarksButton = () => {
    return (
        <Grid>
            <Button>
                Upload Marks
                <input hidden accept="*.csv" type="file" />
            </Button>
        </Grid>
    );
};
