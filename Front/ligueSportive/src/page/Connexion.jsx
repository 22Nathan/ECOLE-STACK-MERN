


import React, { useEffect , useState } from 'react'
import { Link } from "react-router-dom"


function Connexion() {

    const [field1, setField1] = useState('')
    const [field2, setField2] = useState('')

    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(false)

    function initLocalStorage() {
        if( field1 && field2 ){
            // Save data to localStorage
            localStorage.setItem('mail', field1)
            localStorage.setItem('mdp', field2)
        }
    }

    const handleConnexion = async (event) => {
        event.preventDefault()
    
        try {
            if( field1 == "" || field2 == "" ){ return }
            const response = await fetch(`http://localhost:3000/personnes/${field1}/${field2}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },  
            })
    
            if (response.ok) {
                setSuccess(true)
                setError(null)

                initLocalStorage()

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
                    <input type="email" value={field1} onChange={(e) => setField1(e.target.value)} required placeholder='Email' />
                    <input type="text"  value={field2} onChange={(e) => setField2(e.target.value)} required placeholder='Mot de passe' />
                    <button type="submit" className='button button-primary'>
                        Valider
                    </button>
                </form>
                {error && 
                    <p className='text-red-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                        Combinaison fausse
                        <br/>
                        Erreur : {error}
                    </p>
                }
                {success && 
                    <p className='text-green-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                        Connecté avec succès
                    </p>
                }
                <Link to="/inscription" className='button'> Pas de compte ? S'inscrire </Link>
            </div>

        </div>
    )

}

export default Connexion