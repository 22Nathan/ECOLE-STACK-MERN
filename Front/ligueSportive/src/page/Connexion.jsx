


import React, { useEffect } from 'react'
import { Routes , Route } from 'react-router-dom'


function App() {

  return (
    <div>

        <div className=' w-1/2 mx-auto flex flex-col gap-10'>
            <h1 className='text-5xl font-bold'> Connection </h1>
            <form className='flex flex-col gap-4'>
                <input type="text" />
                <input type="text" />
                <button type="submit" className='button button-primary'>Valider</button>
            </form>
        </div>

    </div>
  )
}

export default App