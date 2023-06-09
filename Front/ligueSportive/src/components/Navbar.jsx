

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { useStore } from 'react-svelte-store'
import { store } from '../stores/connected'


const Navbar = () => {

    const [infoConnexion, setInfoConnexion] = useStore(store)

    return (
        <>
            <nav className="fixed border-b transition-colors duration-300 py-3 top-0 inset-x-0 z-50 border-[hsla(0,0%,100%,.1)] bg-[rgba(5,5,5,.5)] backdrop-blur-md">
                <div className="container relative flex justify-between items-center px-4 mx-auto">

                    <Link to="/" className="p-2 group text-gray-300"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </Link>

                    <nav id="nav" className="p-2 text-gray-300 font-normal hidden lg:flex justify-center absolute w-[900px] left-[calc(50%-450px)] gap-1 select-none text-sm">
                        <Link to="/connexion" className="link p-2 uppercase duration-300 mix-blend-difference hover:text-awa-2">Connexion</Link>
                        <Link to="/produits" className="link p-2 uppercase duration-300 mix-blend-difference hover:text-awa-2">Produits</Link>
                        <Link to="/inscription" className="link p-2 uppercase duration-300 mix-blend-difference hover:text-awa-2">Inscription</Link>
                        {
                            ( infoConnexion.admin && infoConnexion.admin.toString() === "true" ) &&
                            <>
                                <Link to="/gestionprod" className="link p-2 uppercase duration-300 mix-blend-difference hover:text-awa-2">Gestion des produits</Link>
                                <Link to="/gestionpers" className="link p-2 uppercase duration-300 mix-blend-difference hover:text-awa-2">Gestion des personnes</Link>
                            </>
                        }
                    </nav>

                    { 
                        ( infoConnexion.connected && infoConnexion.nom ) ? ( 
                            <div>
                                <span className="flex absolute h-3 w-3 right-0 -mt-1 -mr-1 top-[calc(50%-6px)]">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>

                                <div className="absolute top-full right-0 p-3 rounded-lg border border-[hsla(0,0%,100%,.1)] bg-[rgba(5,5,5,.5)] backdrop-blur-md">
                                    <p>Admin : <span className="capitalize">{infoConnexion.admin.toString() || False}</span></p>
                                    <p>{infoConnexion.mail}</p>
                                    <p className="pb-1">{infoConnexion.nom} {infoConnexion.prenom}</p>
                                    <Link to="/panier" className="button button-primary !pt-0 !pb-[2px]">Panier</Link>
                                </div>

                            </div>
                        )
                        :
                        ( 
                            <span className="flex absolute h-3 w-3 right-0 -mt-1 -mr-1 top-[calc(50%-6px)]">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        )
                    }

                </div>
            </nav>
        </>
    )

}

export default Navbar