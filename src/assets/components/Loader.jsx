import React from 'react';

const Loader = () => {

    const bckImg = 'https://www.xtrafondos.com/wallpapers/vertical/pokemon-unite-8705.jpg'

    return (
        <div className='loader- img'>

            <h2 style={
                {
                    backgroundImage: `url(${bckImg}`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh'
                }
            }>...Loading...</h2>
        </div>
    );
};

export default Loader;