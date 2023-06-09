

import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

import { useStore } from 'react-svelte-store'
import { store } from '../stores/connected'

import Ajout from '../components/produits/Ajout'
import Suppression from '../components/produits/Suppression'
import Modifier from '../components/produits/Modifier'


function GestionProduits() {

    const [infoConnexion, setInfoConnexion] = useStore(store)

    const isAdmin = infoConnexion.admin
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAdmin || isAdmin === "false") { navigate('/') }
    }, [isAdmin, navigate])

    return (
        <div>
            <h1 className="py-20 text-5xl text-center font-bold">Gestion des produits</h1>
            <div className=' w-1/2 mx-auto flex flex-col gap-10'>
                
                <Ajout/>
                <Suppression/>
                <Modifier/>

            </div>
        </div>
    )

}

export default GestionProduits