import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Who from '../images/Who.png';
import Loader from './Loader';

const PokemonCard = ({ url }) => {


    const [loading, setLoading] = useState(true)

    const [onePokemon, setOnePokemon] = useState({})
    useEffect(() => {
        axios
            .get(url)
            .then(res => {
                setOnePokemon(res.data)
                setLoading(false)
            })

    }, [])
    console.log(onePokemon);

    const PokemonImageNull = Who
    // 'https://image.pngaaa.com/169/1906169-middle.png'


    const navigate = useNavigate();


    return (
        <div className='singleCard'
            onClick={() => navigate(`/pokedex/${onePokemon.id}`)}>
            {loading ? (<Loader />) : (
                <section>
                    
                    <div className={`${onePokemon.types[0].type.name} pokemonBackground`}>
                        <img className='pokemonsSize'
                            src={onePokemon.sprites.other.home.front_default ?
                                (onePokemon.sprites.other.home.front_default) : (PokemonImageNull)} />
                    </div>
                    <div>
                        <h2 className={`${onePokemon.types[0].type.name} pokeName-text`}
                        >{onePokemon.name.charAt(0).toUpperCase() + onePokemon.name?.slice(1)}</h2>
                        <h2 className='types-text'>
                            {(onePokemon.types[0].type.name) ?
                                (onePokemon?.types[0].type?.name.charAt(0).toUpperCase() + onePokemon.types[0]?.type?.name.slice(1))
                                : 'wait...'} {' '}
                            {(onePokemon?.types[1]?.type?.name) ?
                                `/ ${(onePokemon?.types[1]?.type?.name.charAt(0).toUpperCase() + onePokemon.types[1]?.type?.name.slice(1))}`
                                : null}
                        </h2>
                        <h3 className='type-text'>Type</h3>
                        <div className='pokemon-stats-container'>
                            <div className='pokemon-stats'>
                                <div >
                                    <h3>HP</h3>
                                    <h2 className={`${onePokemon.types[0].type.name} stats`}
                                    >{onePokemon.stats[0].base_stat}</h2>
                                </div>
                                <div>
                                    <h3>Attack</h3>
                                    <h2 className={`${onePokemon.types[0].type.name} stats`}
                                    >{onePokemon.stats[1].base_stat}</h2>
                                </div>
                                <div>
                                    <h3>Defense</h3>
                                    <h2 className={`${onePokemon.types[0].type.name} stats`}
                                    >{onePokemon.stats[2].base_stat}</h2>
                                </div>
                                <div>
                                    <h3>Speed</h3>
                                    <h2 className={`${onePokemon.types[0].type.name} stats`}
                                    >{onePokemon.stats[5].base_stat}</h2>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            )
            }
        </div>
    );
};

export default PokemonCard;