import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            Home
            <NavLink to={"/tools/csv-to-chart"}>Tools</NavLink>
        </div>
    );
};

export default Home;