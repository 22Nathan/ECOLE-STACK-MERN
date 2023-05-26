

import React, { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast'


function SuppressionPersonne() {

    const notifyS = () => toast.success('Succès')
    const notifyE = () => toast.error('Echec')

    const [field1, setField1] = useState('')

    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(false)

    const handleSuppressionProduits = async(event) => {
        event.preventDefault()

        try {
            if( field1 != ""){
                const response = await fetch(`http://localhost:3000/personnes/${field1}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id:field1
                    })
                })
        
                if (response.ok) {
                    setSuccess(true)
                    setError(null)
                    setField1('')
                    notifyS()
                } 
                else {
                    setError('failed')
                    setSuccess(false)
                    notifyE()
                }
            }
        } catch (error) {
            console.error('Error : ', error)
            setError('failed')
            setSuccess(false)
        }

    }

    return (
        <>

            <h1 className='text-3xl font-bold'> Supression </h1>
            <form onSubmit={handleSuppressionProduits} className='flex flex-col gap-4'>
                <input type="number" value={field1} onChange={(e) => setField1(e.target.value)} required placeholder='ID du profil' />
                <button type="submit" className='button button-primary'>
                    Valider
                </button>
            </form>

            {error && 
                <p className='text-red-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                    Erreur lors da suppression du profil
                    <br/>
                    Erreur : {error}
                </p>
            }
            {success && 
                <p className='text-green-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                    Suppression effectuée
                </p>
            }

        </>
    )

}

export default SuppressionPersonne