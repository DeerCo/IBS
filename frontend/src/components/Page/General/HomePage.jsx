import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBar from '../../Module/Navigation/NavBar';
import Homecard from '../../Module/Course/Homecard';
import { Grid } from '@mui/material';

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
        <Grid container direction="column" height="100%" wrap="nowrap">
            <NavBar item page="Home" role={currRole} />
            <Grid
                item
                container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignContent="center"
                justify="center"
                flex="1 1 auto"
            >
                {roles.map((data, index) => (
                    <Grid item key={index}>
                        <Homecard data={data} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Home;
