import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import InputName from './assets/components/InputName'
import Pokedex from './assets/components/Pokedex'
import PokedexId from './assets/components/PokedexId'
import PokemonNotFounded from './assets/components/PokemonNotFounded'
import ProtectedRoutes from './assets/components/ProtectedRoutes'
import useLocalStorage from 'use-local-storage'


function App() {
  const [appLoading, setAppLoading] = useState(false)
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')
  const sunBtn = "fa-regular fa-sun fa-xl";
  const moonBtn = "fa-regular fa-moon fa-xl"
  const [iconSwitch, setIconSwitch] = useState(true)

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
    setIconSwitch(!iconSwitch)
  }

  return (
    <main className="App" data-theme={theme}>
      <HashRouter>
        <div className='drk-btn'>
           <i onClick={switchTheme} class={iconSwitch ? sunBtn : moonBtn}></i> 
        </div>
        <Routes>
          <Route path='/' element={<InputName />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<Pokedex />}></Route>
            <Route path='/pokedex/:id' element={<PokedexId />}></Route>
            <Route path='/pokemonNotFounded' element={<PokemonNotFounded />}></Route>
          </Route>
        </Routes>
      </HashRouter>


    </main >
  )
}

export default App
