

import { createStore } from 'react-svelte-store'

export const { useStore , store } = createStore(false)

store.set( localStorage.getItem( "connected" || false ) )
store.subscribe( value => { localStorage.setItem( "connected", value ) } )