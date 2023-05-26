

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import { useStore } from 'react-svelte-store'
import { store } from '../stores/connected'



const Panier = () => {

    const [infoConnexion, setInfoConnexion] = useStore(store)

    const notifyS = () => toast.success('Panier validé avec succès')
    const notifyE = () => toast.error('Echec')

    const isConnected = infoConnexion.connected
    const navigate = useNavigate()

    useEffect(() => {
        if (!isConnected || isConnected === "false") { navigate('/') }
    }, [isConnected, navigate])

    const {panier} = infoConnexion

    const handlePanier = async () => {

        const countOccurrences = (array) => {
            return array.reduce((count, item) => {
              const key = JSON.stringify(item)
              count[key] = (count[key] || 0) + 1
              return count;
            }, {})
        }

        const occurrenceCounts = countOccurrences(panier)
        
        const requests = panier.map( async (item) => {

            const nbOccurrences = occurrenceCounts[JSON.stringify(item)] || 0;

            const response = await fetch(`http://localhost:3000/produits/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quantity: ( item.quantity > 0 ? item.quantity - ( nbOccurrences > 0 ? nbOccurrences : 1 ) : 0 ) ,
                })
            })
            return response.status === 200
        } )

        const results = await Promise.all(requests)
        const allRequestsSuccessful = results.every((result) => result === true)

        if ( allRequestsSuccessful ){
            notifyS()
            if( infoConnexion ) { 
                store.update( (v) => {
                    return {
                        ...v,
                        panier: []
                    }
                })
            }
        } else { notifyE() }
    }

    return (
        <div className=''>
            <h1 className='text-5xl font-bold'>Votre panier</h1>

            {infoConnexion.panier ? (
                <div className='flex flex-col gap-20 py-20'>
                    <div className='flex flex-wrap gap-5 justify-start'>
                        { panier.map( (item,index) => (
                            <p key={index} className='relative h-fit w-full lg:w-5/12 flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'> 
                                <span> Item : { item.title } </span>
                                <span> Price : { item.price } </span>
                                <span> Description :<br/> { item.description } </span>
                            </p>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Chargement</p>
            )}

            <button onClick={handlePanier} className='button button-primary'> 
                Valier le panier
            </button>

        </div>
    )
}

export default Panier


