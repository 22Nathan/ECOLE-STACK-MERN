

import React, { useState, useEffect } from "react"


function GestionProduits() {

    const [field1, setField1] = useState('')
    const [field2, setField2] = useState('')
    const [field3, setField3] = useState('')
    const [field4, setField4] = useState('')
    const [field5, setField5] = useState('')
    const [field6, setField6] = useState('')
    const [field7, setField7] = useState('')
    const [field8, setField8] = useState('')
    const [field9, setField9] = useState('')


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
                } 
                else {
                    setError('failed')
                    setSuccess(false)
                }
            }
        } catch (error) {
            console.error('Error : ', error)
            setError('failed')
            setSuccess(false)
        }
    }

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
                } 
                else {
                    setError('failed')
                    setSuccess(false)
                }
            }
        } catch (error) {
            console.error('Error : ', error)
            setError('failed')
            setSuccess(false)
        }

    }

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
                } 
                else {
                    setError('failed')
                    setSuccess(false)
                }
            }
        } catch (error) {
            console.error('Error : ', error)
            setError('failed')
            setSuccess(false)
        }

    }

    return (
        <div>
            <h1 className="py-20 text-5xl text-center font-bold">Gestion des produits</h1>
            <div className=' w-1/2 mx-auto flex flex-col gap-10'>
                <h1 className='text-3xl font-bold'> Ajout </h1>
                <form onSubmit={handleAjoutProduits} className='flex flex-col gap-4'>
                    <input type="text"        value={field1} onChange={(e) => setField1(e.target.value)} required placeholder='Nom du produit' />
                    <input type="number"      value={field2} onChange={(e) => setField2(e.target.value)} min="1" required placeholder='Prix' />
                    <input type="text"        value={field3} onChange={(e) => setField3(e.target.value)} required placeholder='Description' />
                    <input type="number"      value={field4} onChange={(e) => setField4(e.target.value)} min="1" required placeholder='Quantité' />
                    <input type="text"        value={field5} onChange={(e) => setField5(e.target.value)} required placeholder='Provenance' />
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
            </div>
        </div>
    )

}

export default GestionProduits