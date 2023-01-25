import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Something from '../images/Something';
import PokemonCard from './PokemonCard';
import Header from './Header';

const Pokedex = () => {

    const userName = useSelector(state => state.userName)
    const [pokemons, setPokemons] = useState([])
    const [pokemonType, setPokemonType] = useState([])

    // ----Pagination---
    const [page, setPage] = useState(1)
    const pokemosPerPage = 18
    const lastIndex = page * pokemosPerPage;
    const firstIndex = lastIndex - pokemosPerPage;
    const pokemonsPaginated = pokemons?.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(pokemons.length / (pokemosPerPage))

    const pages = []
    for (let i = page - 4; i <= page + 4; i++) {
        if (i >= page && i <= totalPages)
            pages.push(i)
    }


    // --- Full request all pokemons ---
    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1279`)
            .then(res => setPokemons(res.data.results))
            .catch(() => {
                navigate('/pokemonNotFounded')
            }
            )
    }, [])
    // console.log(pokemons);
    // console.log(pokemonsPaginated);


    // ------Type request ----
    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setPokemonType(res.data.results))
    }, [])
    // console.log(pokemonType);


    // ---- Search by Name ----
    const [pokemonName, setPokemonName] = useState('');
    const navigate = useNavigate();
    const searchPokemon = () => {
        navigate(`/pokedex/${pokemonName.toLowerCase()}`)
    }

    // --- Filter for type ----
    const filterType = (e) => {
        const url = e.target.value
        // alert(url)
        axios
            .get(url)
            .then(res => setPokemons(res.data.pokemon))
    }

    return (
        <div>
            <header className='header'>
                <Header />
            </header>
            <section className='Pokedex-container'>
                <div className='text-and-input-container'>
                    <h2 className='welcome-message'>Welcome {userName}! </h2>
                    <h2 className='welcome-text'>Search all the info for your favorite Pokemon</h2>
                    {/* --- Search by name/id --- */}
                    <form
                        className='form-SearchPokemon'
                        onSubmit={searchPokemon}>
                        <input
                            className='pkdx-inputSearch'
                            type="text" placeholder='Search for a pokemon'
                            value={pokemonName}
                            onChange={(e) => setPokemonName(e.target.value)} />
                        <button
                            required
                            className='pkdx-btn'
                        >Search</button>

                        {/* ---Search by types --- */}
                        {/* Filter for Type */}
                        <select
                            className='pkdx-inputSearch'
                            onChange={filterType}>
                            <option> All the pokemons</option>
                            {pokemonType.map(currentType => (
                                <option
                                    key={currentType.name}
                                    // Filter for Type
                                    value={currentType.url}
                                >{currentType.name.charAt(0).toUpperCase() + currentType.name.slice(1)}
                                </option>
                            ))}</select>
                    </form>
                </div>

                <div className='all-cards-container'>
                    {/* Get the URL for the pokemons */}
                    <ul className='all-cards'>
                        {/* --- Change for pagination--- */}
                        {pokemonsPaginated?.map((currentPokemon) => (
                            <PokemonCard className='singleCard'
                                key={currentPokemon.url ? currentPokemon.url : currentPokemon.pokemon.url}
                                url={currentPokemon.url ? currentPokemon.url : currentPokemon.pokemon.url}
                            />
                        ))}
                    </ul>
                </div>


                {/* ---Pagination pages*/}
                <div className='all-pagination'>
                    <div className='pags-btn'>
                        <button
                            className='page-byOne'
                            onClick={() => { setPage(page - 1) }}
                            disabled={page === 1} >{'<<'}</button>
                        {pages?.map(number => (
                            <button
                                className='page-num'
                                onClick={() => { setPage(number) }}>{number}</button>
                        ))
                        }
                        <button
                            className='page-byOne'
                            onClick={() => { setPage(page + 1) }}
                            disabled={page === totalPages} >{'>>'}</button>
                    </div>
                    <div className='fivePages-btns'>
                        <button
                            className='fivePages-btn'
                            onClick={() => { setPage(page - 5) }}
                            disabled={page < 6}>Last 5</button>
                        <button
                            className='fivePages-btn'
                            onClick={() => { setPage(page + 5) }}
                            disabled={page > pages - 15}>Next 5</button>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pokedex;