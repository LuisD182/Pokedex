import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const PokemonNotFounded = () => {
    return (
        <div >
            <header className='header'>
                <Header />
            </header>
            <section className='pokemonNotFounded'>
                <p className='text-pokemonNotFounded'>
                    <h2>We could not found that pokemon!</h2>
                    <Link className='btn-backToPokedex' to={'/pokedex'}>Go back to the pokedex</Link>
                </p>
                <img
                    className='charizard'
                    src="https://media.tenor.com/23cMPonP3z4AAAAC/pokemon-charizard.gif" alt="" />
            </section>

        </div>
    );
};

export default PokemonNotFounded;