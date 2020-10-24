import React from 'react';
import { NavLink } from 'react-router-dom';

const DefaultPost = () => {
    return (
        <div>
            <NavLink to="/createpost">Create a new post now</NavLink>
        </div>
    );
};

export default DefaultPost;
