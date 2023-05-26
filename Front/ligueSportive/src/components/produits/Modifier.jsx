

import React, { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast'


function GestionProduits() {

    const notifyS = () => toast.success('Succès')
    const notifyE = () => toast.error('Echec')

    const [field7, setField7] = useState('')
    const [field8, setField8] = useState('')
    const [field9, setField9] = useState('')

    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(false)

    const handleModificationProduits = async(event) => {
        event.preventDefault()

        try {
            if( field7 != ""){
                const response = await fetch(`http://localhost:3000/produits/${field7}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        quantity:field8,
                        price:field9
                    })
                })
        
                if (response.ok) {
                    setSuccess(true)
                    setError(null)
                    setField7('')
                    setField8('')
                    setField9('')
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

            <h1 className='text-3xl font-bold'> Modification </h1>
            <form onSubmit={handleModificationProduits} className='flex flex-col gap-4'>
                <input type="text"        value={field7} onChange={(e) => setField7(e.target.value)} required placeholder='ID du produit' />
                <input type="number"      value={field8} onChange={(e) => setField8(e.target.value)} min="1" required placeholder='Prix' />
                <input type="number"      value={field9} onChange={(e) => setField9(e.target.value)} min="1" required placeholder='Quantité' />
                <button type="submit" className='button button-primary'>
                    Valider
                </button>
            </form>
            {error && 
                <p className='text-red-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                    Erreur lors de la modification du produit
                    <br/>
                    Erreur : {error}
                </p>
            }
            {success && 
                <p className='text-green-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                    Modification effectuée 
                </p>
            }
        </>
    )

}

export default GestionProduits