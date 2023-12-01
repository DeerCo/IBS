import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const HomeCardLink = ({ name, to }) => {
    return (
        <Link to={to}>
            <Button>{name}</Button>
        </Link>
    );
};

export default HomeCardLink;
