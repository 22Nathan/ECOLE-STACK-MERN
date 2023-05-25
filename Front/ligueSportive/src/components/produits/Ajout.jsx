

import React, { useState, useEffect } from "react"


function GestionProduits() {

    const notifyS = () => toast.success('Succès')
    const notifyE = () => toast.error('Echec')

    const [field1, setField1] = useState('')
    const [field2, setField2] = useState('')
    const [field3, setField3] = useState('')
    const [field4, setField4] = useState('')
    const [field5, setField5] = useState('')

    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(false)

    const handleAjoutProduits = async (event) => {
        event.preventDefault()
    
        try {
            if( field1 != "" && field2 != "" && field3 != "" && field4 != "" && field5 != "" ){
                const response = await fetch('http://localhost:3000/produits/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title:field1,
                        price:field2,
                        description:field3,
                        quantity:field4,
                        made:field5
                    })
                })
        
                if (response.ok) {
                    setSuccess(true)
                    setError(null)
                    setField1('')
                    setField2('')
                    setField3('')
                    setField4('')
                    setField5('')
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
            <h1 className='text-3xl font-bold'> Ajout </h1>
            <form onSubmit={handleAjoutProduits} className='flex flex-col gap-4'>
                <input type="text"   value={field1} onChange={(e) => setField1(e.target.value)}         required placeholder='Nom du produit' />
                <input type="number" value={field2} onChange={(e) => setField2(e.target.value)} min="1" required placeholder='Prix' />
                <input type="text"   value={field3} onChange={(e) => setField3(e.target.value)}         required placeholder='Description' />
                <input type="number" value={field4} onChange={(e) => setField4(e.target.value)} min="1" required placeholder='Quantité' />
                <input type="text"   value={field5} onChange={(e) => setField5(e.target.value)}         required placeholder='Provenance' />
                <button type="submit" className='button button-primary'>
                    Valider
                </button>
            </form>
            {error && 
                <p className='text-red-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                    Erreur lors de l'ajout du produit
                    <br/>
                    Erreur : {error}
                </p>
            }
            {success && 
                <p className='text-green-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                    Ajout effectué 
                </p>
            }
        </>
    )

}

export default GestionProduits