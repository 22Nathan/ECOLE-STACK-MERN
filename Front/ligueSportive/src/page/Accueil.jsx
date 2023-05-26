


import React, { useEffect } from 'react'
import { Routes , Route } from 'react-router-dom'

import image from '../assets/ipssi-logo.png'

function Accueil() {

  return (
    <div>

      <div className='w-full h-full grid grid-cols-1 place-content-center justify-between gap-20 relative'>

        {/* <img src={image} alt="" className='absolute hue-rotate-180' /> */}

        <p className='text-5xl font-bold'>Projet Ligue Sportive</p>
        <div className='flex text-2xl font-light w-full gap-20'>
          <p>
            Nathan ROSSI<br/>
            Shamnawaz SUBA KHAN<br/>
            Pierre Antoine SAMUEL<br/>
          </p>
          <p className='text-3xl font-bold'>
            Groupe 6
          </p>
        </div>
      </div>

    </div>
  )
}

export default Accueil