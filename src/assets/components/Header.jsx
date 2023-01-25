import React from 'react';
import dex from '../images/dex.png';

const Header = () => {
    return (
        <header className='header'>
            <div className='red'></div>
            <div className='black'></div>
            <div className='white-circle'></div>
            <div className='black-circle'></div>
            <img className='dex' src={dex} alt="" srcset="" />
        </header>
    );
};

export default Header;