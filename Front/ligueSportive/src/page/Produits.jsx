import React, { useEffect, useState } from 'react'

const Hero = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/produits')
                const jsonData = await res.json()
                setData(jsonData)
                console.log(typeof jsonData, jsonData)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])

    const [elementDisplay, setElementDisplay] = useState('hidden');
    const handleClick = (id) => {
        setElementDisplay('block')
      };

    return (
        <div className=''>
            <h1 className='text-5xl font-bold'>Liste des produits disponibles</h1>
            {data ? (
                <div className='flex flex-col gap-20 py-20'>
                    <div className='flex flex-col gap-1'>
                        {data.map((item) => (
                            <div key={item.id} className='relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                                <p>
                                    <span className='pl-1'>{item.title}</span>
                                </p>
                                <p>
                                    <span className='text-xl font-medium'>Prix :</span><br />
                                    <span className='pl-1'>{item.price}</span>
                                </p>
                                <p>
                                    <span className='text-xl font-medium'>Quantité :</span><br />
                                    <span className='pl-1'>{item.quantity}</span>
                                </p>
                                <p className='hidden' style={{ display: elementDisplay }}>
                                    <span className='text-xl font-medium'>Description :</span><br />
                                    <span className='pl-1'>{item.description}</span>
                                </p>
                                <button onClick={() => handleClick(item.id)} type="submit" className='button button-primary'>
                                    Voir détails
                                </button>
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


