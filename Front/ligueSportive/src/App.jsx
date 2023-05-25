


import React, { useEffect } from 'react'
import { Routes , Route } from 'react-router-dom'

import Navbar from './components/Navbar'

import Accueil from './page/Accueil'
import Connexion from './page/Connexion'
import Produits from './page/Produits'
import Inscription from './page/Inscription'
import GestionProduits from './page/GestionProduits'

import { Gradient } from './assets/Gradient'

function App() {

  useEffect(()=>{
    const gradient = new Gradient()
    gradient.initGradient('#gradient-canvas')
  }, [])

  return (
    <div>

      <canvas id="gradient-canvas" className="fixed top-0 left-0 -z-10" data-transition-in />

      <Navbar/>

      <div className='py-40 px-10'>
        <Routes>
          <Route path='/' element={ <Accueil/> }/>
          <Route path='/connexion' element={ <Connexion/> }/>
          <Route path='/produits' element={ <Produits/> }/>
          <Route path='/inscription' element={ <Inscription/> }/>
          <Route path='/gestionprod' element={ <GestionProduits/> }/>
        </Routes>
      </div>

    </div>
  )
}

export default App
