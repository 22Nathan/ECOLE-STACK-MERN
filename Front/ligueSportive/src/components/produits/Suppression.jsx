

import React, { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast'

function GestionProduits() {

    const notifyS = () => toast.success('Succès')
    const notifyE = () => toast.error('Echec')

    const [field6, setField6] = useState('')

    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(false)

    const handleSuppressionProduits = async(event) => {
        event.preventDefault()

        try {
            if( field6 != ""){
                const response = await fetch(`http://localhost:3000/produits/${field6}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id:field6
                    })
                })
        
                if (response.ok) {
                    setSuccess(true)
                    setError(null)
                    setField6('')
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
                <input type="text" value={field6} onChange={(e) => setField6(e.target.value)} required placeholder='ID du produit' />
                <button type="submit" className='button button-primary'>
                    Valider
                </button>
            </form>

            {error && 
                <p className='text-red-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                    Erreur lors da suppression du produit
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

export default GestionProduits