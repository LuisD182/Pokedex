import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeUserName } from '../../store/slices/userName.slice';
import imgFront from '../images/2.png'
import Footer from './Footer';

const InputName = () => {

    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('')

    const navigate = useNavigate();

    const clickButton = () => {
        dispatch(changeUserName(inputValue))
        navigate('/pokedex')
    }

    return (
        <div>
            <section className='InputName'>
                <div className='img-container'>
                    <img className='imgFront' src={imgFront} alt="" />
                </div>
                <section className='InputName-content'>
                    <div className='input-text'>
                        <h2>Welcome trainer!</h2>
                        <br />
                        <h3>Please write your name to continue</h3>
                        <form onSubmit={() => clickButton()}>
                            <input className='input'
                                type="text"
                                placeholder='Your name...'
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)} />
                            <button className='start-btn' onClick={() => clickButton()}>Start</button>
                        </form>
                        
                        <img src="https://media.tenor.com/74l5y1hUdtwAAAAi/pokemon.gif" alt="" />
                    </div>

                    <footer className='footer'>
                        <Footer />
                    </footer>
                </section>


            </section>

        </div>
    );
};

export default InputName;