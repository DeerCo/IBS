import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../../Module/Navigation/NavBar';
import Homecard from '../../Module/Course/Homecard';
import { Grid, Typography } from '@mui/material';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';

let Home = () => {
    let navigate = useNavigate();

    let [roles, setRoles] = useState([]);
    let [currRole, setCurrRole] = useState('');

    useEffect(() => {
        let storage_roles = JSON.parse(sessionStorage.getItem('roles'));

        if (!storage_roles) {
            toast.warn('You need to login again', { theme: 'colored' });
            navigate('/login');
        } else {
            setRoles(storage_roles);
        }
    }, [navigate]);

    useEffect(() => {
        if (roles.length === 0) {
            setCurrRole('');
        } else {
            setCurrRole(roles[0]['role']);
        }
    }, [roles]);

    return (
        <PageContainer title="Home" description="Home page">
            <Grid container direction="column" height="100%" wrap="nowrap">
                <NavBar item page="Home" role={currRole} />
                <Typography variant="h1" sx={{ textAlign: 'center', marginTop: '32px' }}>
                    Dashboard
                </Typography>
                <Grid item container padding={'32px'}>
                    {roles.length === 0 && (
                        <Typography variant='h2' sx={{margin: '32px'}} > 
                            You're not enrolled in any active courses. 
                        </Typography>
                    )}
                    {roles.map((data, index) => (
                        <Grid item key={index}>
                            <Homecard data={data} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default Home;
