

import React, { useState, useEffect } from "react"


function ModificationPersonne() {

    const notifyS = () => toast.success('Succès')
    const notifyE = () => toast.error('Echec')

    const [field1, setField1] = useState('')
    const [field2, setField2] = useState('')
    const [field3, setField3] = useState('')
    const [field4, setField4] = useState('')
    const [field5, setField5] = useState('')
    const [field6, setField6] = useState('')
    const [field7, setField7] = useState('')

    const [error, setError]     = useState(null)
    const [success, setSuccess] = useState(false)

    const handleModificationProduits = async(event) => {
        event.preventDefault()

        try {
            if( field1 != "" && field2 != "" && field3 != "" && field4 != "" && field5 != "" && field6 != "" && field7 != "" ){
                const response = await fetch(`http://localhost:3000/personnes/${field1}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nom:field2,
                        prenom:field3,
                        telephone:field4,
                        mail:field5,
                        mdp:field6,
                        admin:field7
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
                    setField6('')
                    setField7('')
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
                <input type="number"   value={field1} onChange={(e) => setField1(e.target.value)} required placeholder='ID' />
                <input type="text"     value={field2} onChange={(e) => setField2(e.target.value)} required placeholder='Nom' />
                <input type="text"     value={field3} onChange={(e) => setField3(e.target.value)} required placeholder='Prenom' />
                <input type="tel"      value={field4} onChange={(e) => setField4(e.target.value)} required placeholder='Telephone' />
                <input type="email"    value={field5} onChange={(e) => setField5(e.target.value)} required placeholder='Mail' />
                <input type="password" value={field6} onChange={(e) => setField6(e.target.value)} required placeholder='MDP' />
                <input type="number"   value={field7} onChange={(e) => setField7(e.target.value)} min="0" max="1" required placeholder='Admin 0 ou 1' />
                <button type="submit" className='button button-primary'>
                    Valider
                </button>
            </form>
            {error && 
                <p className='text-red-600 relative flex flex-col gap-2 p-3 border border-[hsla(0,0%,100%,.1)] backdrop-blur-sm rounded-lg bg-[rgba(5,5,5,.5)]'>
                    Erreur lors de la modification du profil
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

export default ModificationPersonne