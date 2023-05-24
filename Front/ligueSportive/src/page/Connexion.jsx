


import React, { useEffect , useState } from 'react'
import { Routes , Route } from 'react-router-dom'


function Connexion() {

    const [field1, setField1] = useState('')
    const [field2, setField2] = useState('')

    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(false)

    const handleConnexion = async (event) => {
        event.preventDefault()
    
        try {
            const response = await fetch('http://localhost:3000/movies/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email:field1 , password:field2 })    
            })
    
            if (response.ok) {
                setSuccess(true)
                setError(null)
                setField1('')
                setField2('')
            } 
            else {
                setError('failed')
                setSuccess(false)
            }

        } catch (error) {
            console.error('Error : ', error)
            setError('failed')
            setSuccess(false)
        }
    }

    return (
        <div>

            <div className=' w-1/2 mx-auto flex flex-col gap-10'>
                <h1 className='text-5xl font-bold'> Connection </h1>
                <form onSubmit={handleConnexion} className='flex flex-col gap-4'>
                    <input type="email" value={field1} onChange={(e) => setField1(e.target.value)} placeholder='Email' />
                    <input type="text"  value={field2} onChange={(e) => setField2(e.target.value)} placeholder='Mot de passe' />
                    <button type="submit" className='button button-primary'>
                        Valider
                    </button>
                </form>
            </div>

        </div>
    )

}

export default Connexion