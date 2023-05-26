

import React, { useEffect, useState } from 'react'

import { useStore } from 'react-svelte-store'
import { store } from '../stores/connected'



const Hero = () => {

    const [infoProduit, setInfoProduit] = useStore(store)

    const [data, setData] = useState(null)
    const [openItems, setOpenItems] = useState([])

    // recup
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/produits')
                const jsonData = await res.json()
                setData(jsonData)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])

    const handleClick = (item) => {
      if (openItems.includes(item)) { setOpenItems(openItems.filter((openItem) => openItem !== item)) } 
      else { setOpenItems([...openItems, item]) }
    }

    async function getInformationProduit(id){
        const response = await fetch(`http://localhost:3000/produits/${id}`)
        const res = await response.json()

        if( !infoProduit.panier ) { 
            store.update( (v) => {
                return {
                    ...v,
                    panier: []
                }
            } )
        }

        store.update( (v) => {
            return {
                ...v,
                panier: Array.isArray(v.panier) ? [...v.panier] : [],
                panier: [
                    ...v.panier,
                    {title: res.title, price: res.price, id: res.id, made: res.made, quantity:res.quantity, description: res.description},
                    // ...v.panier + JSON.stringify({title: res.title, price: res.price}),
                ]
            }
        } )
    }

    return (
        <div className=''>
            <h1 className='text-5xl font-bold'>Liste des produits disponibles</h1>
            {data ? (
                <div className='flex flex-col gap-20 py-20'>
                    <div className='flex flex-wrap gap-5 justify-start'>
                        {data.map((item) => (
                            <div key={item.id} className='relative h-fit w-full lg:w-5/12 flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                                <p>
                                    <span className=''>{item.title}</span>
                                </p>
                                <p className='flex justify-between items-center'>
                                    <span className='text-xl font-medium'>Prix :</span>
                                    <span className='p-1 font-semibold'>{item.price} $</span>
                                </p>
                                <p className='flex justify-between items-center'>
                                    <span className='text-xl font-medium'>Quantité :</span>
                                    <span className='p-1 font-semibold'>{item.quantity}</span>
                                </p>
                                <p className='hidden' style={{ display: openItems.includes(item) ? 'block' : 'none' }}>
                                    <span className='text-xl font-medium'>Description :</span><br />
                                    <span className='pl-1'>{item.description}</span>
                                </p>
                                <div className='flex gap-2'>
                                    <button onClick={() => handleClick(item)} type="button" className='button button-primary flex-1'>
                                        {openItems.includes(item) ? 'Cacher détails' : 'Voir détails'}
                                    </button>
                                    { infoProduit.connected && infoProduit.connected.toString() === "true" && 
                                        <button disabled={ item.quantity==0 } onClick={() => getInformationProduit(item.id)} type="button" className={ item.quantity>0 ? 'button button-primary flex-none' : 'button button-primary flex-none pointer-events-none opacity-50' }>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                            </svg>
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Chargement</p>
            )}
        </div>
    )
}

export default Hero


