import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Loader from './Loader';

const PokedexId = () => {


    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [movements, setMovements] = useState([])
    const pokemonWho = 'https://media.tenor.com/ZQvpE8_p-hMAAAAC/pokemon-confused.gif'



    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                setPokemon(res.data)
                setLoading(false)
            })
            .catch(() => {
                navigate('/pokemonNotFounded')
            })
    }, [id])
    // console.log(pokemon);
    const nextPokemon = (pokemon.id) + 1
    const prevPokemon = (pokemon.id) - 1
    console.log(nextPokemon);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                setMovements(res.data.moves)
                setLoading(false)
            })
            .catch(() => {
                navigate('/pokemonNotFounded')
            })
    }, [id])
    console.log(movements);


    return (
        <div>
            {loading ? (<Loader />) : (
                <section className='pokedexId-main-container'>
                    <header className='header'>
                        <Header />
                    </header>
                    <button
                        className='goBack-btn prev'
                        onClick={() => { navigate(`/pokedex/${prevPokemon}`) }}
                        disabled={prevPokemon < 1}
                    >Prev
                    </button>
                    <button
                        className='goBack-btn'
                        onClick={() => { navigate(`/pokedex/${nextPokemon}`) }}
                        disabled={nextPokemon === 1278}
                    >Next
                    </button>
                    <button
                        className='pkdx'
                        onClick={() => { navigate(`/pokedex/`) }}
                    >{`<<`}
                    </button>
                    <div className='pokedexId-container'>
                        <div className='pkdx-mainInfo'>
                            <div className={`${pokemon.types[0]?.type.name} singlePokemon-background`}></div>
                            <img className={`singlePokemon-size`}
                                src={pokemon.sprites?.other.home?.front_default ?
                                    (pokemon.sprites?.other.home?.front_default) : (pokemonWho)
                                } alt="" />
                            <h2> #{pokemon.id}</h2>
                            <h2>{`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h2>
                        </div>
                        <div className='pkdx-secondaryInfo'>
                            <p>
                                <h2 className='grayLetters'>Weight</h2>
                                <h3>{pokemon.weight}</h3>
                            </p>
                            <p>
                                <h2 className='grayLetters'>Height</h2>
                                <h3>{pokemon.height}</h3>
                            </p>
                        </div>
                        <div className='pkdx-terciaryInfo'>
                            <div className='pkdx-typeInfo'>
                                <h2 className='grayLetters'>Type: </h2>
                                <div className='stat-types-container'>
                                    <p >
                                        {(pokemon.types[0].type.name) ?
                                            (<h2 className={`${pokemon.types[0]?.type.name} stat-types`}>
                                                {`${(pokemon?.types[0]?.type?.name.charAt(0).toUpperCase() + pokemon.types[0]?.type?.name.slice(1))}`}
                                            </h2>)

                                            : 'wait...'} {' '}
                                    </p>
                                    <p>
                                        {(pokemon?.types[1]?.type.name) ?
                                            (<h2 className={`${pokemon.types[1]?.type.name} stat-types`}>
                                                {`${(pokemon?.types[1]?.type?.name.charAt(0).toUpperCase() + pokemon.types[1]?.type?.name.slice(1))}`}
                                            </h2>)
                                            : (null)}
                                    </p>
                                </div>
                            </div>
                            <p className='pkdx-typeInfo'>
                                <h2 className='grayLetters'>Skills:</h2>
                                <h2 className='skills-descr'>{pokemon.abilities[0]?.ability.name.charAt(0).toUpperCase() + pokemon.abilities[0]?.ability.name.slice(1)}</h2>
                                {pokemon.abilities[1]?.ability.name ? (  <h2 className='skills-descr' >{
                                    pokemon.abilities[1]?.ability.name.charAt(0).toUpperCase() + pokemon.abilities[1]?.ability.name.slice(1)}
                                    </h2>) :(null)}
                            </p>
                        </div>
                        {/* -Stats */}
                        <h2 className='grayLetters stats-title'>Stats</h2>
                        <div className='space-btw-stats'>
                            <div className='single-stat' >
                                <h2 className='text-single-stat'>HP : <span className={`${pokemon.types[0].type.name} stats`}
                                >{pokemon.stats[0].base_stat}</span> /150
                                </h2>
                                <div className='general-bar'>
                                    <div style={
                                        {
                                            width: `${2 * (pokemon.stats[0].base_stat)}px`,
                                            backgroundColor: 'green',
                                            position: 'relative',
                                            height: '50px',
                                            borderRadius: '1rem'
                                        }
                                    }>
                                    </div>
                                </div>
                            </div>
                            <div className='single-stat' >
                                <h2 className='text-single-stat' >Attack : <span className={`${pokemon.types[0].type.name} stats`}
                                >{pokemon.stats[1].base_stat}</span> /150
                                </h2>
                                <div className='general-bar'>
                                    <div style={
                                        {
                                            width: `${2 * (pokemon.stats[1].base_stat)}px`,
                                            backgroundColor: 'red',
                                            position: 'relative',
                                            height: '50px',
                                            borderRadius: '1rem'
                                        }
                                    }>
                                    </div>
                                </div>
                            </div>
                            <div className='single-stat' >
                                <h2 className='text-single-stat'>Defense : <span className={`${pokemon.types[0].type.name} stats`}
                                >{pokemon.stats[2].base_stat}</span> /150
                                </h2>
                                <div className='general-bar'>
                                    <div style={
                                        {
                                            width: `${2 * (pokemon.stats[2].base_stat)}px`,
                                            backgroundColor: 'navy',
                                            position: 'relative',
                                            height: '50px',
                                            borderRadius: '1rem'
                                        }
                                    }>
                                    </div>
                                </div>
                            </div>
                            <div className='single-stat' >
                                <h2 className='text-single-stat'>Speed : <span className={`${pokemon.types[0].type.name} stats`}
                                >{pokemon.stats[0].base_stat}</span> /150
                                </h2>
                                <div className='general-bar'>
                                    <div style={
                                        {
                                            width: `${2 * (pokemon.stats[0].base_stat)}px`,
                                            backgroundColor: 'gold',
                                            position: 'relative',
                                            height: '50px',
                                            borderRadius: '1rem'
                                        }
                                    }>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h2 className='grayLetters stats-title'>Movements</h2>
                        <div className='general-moves-list'>
                            <ul className='moves-list'>
                                {movements?.map(move => (
                                    <li
                                        className='single-move'
                                        key={move.url}>
                                        {move.move.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )
            }
        </div>

    );
};

export default PokedexId;