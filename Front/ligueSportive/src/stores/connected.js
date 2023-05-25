

import { createStore } from 'react-svelte-store'

export const { useStore , store } = createStore({
    // nom       : ''    ,
    // prenom    : ''    ,
    // mail      : ''    ,
    // panier    : {}    ,
    // connected : false
    nom       : localStorage.getItem( "nom"       ),
    prenom    : localStorage.getItem( "prenom"    ),
    mail      : localStorage.getItem( "mail"      ),
    panier    : localStorage.getItem( "panier"    ),
    connected : localStorage.getItem( "connected" )  
})

store.set({
    nom       : localStorage.getItem( "nom"       ) != "null" ? localStorage.getItem( "nom"       ) : null ,
    prenom    : localStorage.getItem( "prenom"    ) != "null" ? localStorage.getItem( "prenom"    ) : null ,
    mail      : localStorage.getItem( "mail"      ) != "null" ? localStorage.getItem( "mail"      ) : null ,
    panier    : localStorage.getItem( "panier"    ) != "null" ? localStorage.getItem( "panier"    ) : {}   ,
    connected : localStorage.getItem( "connected" ) != "null" ? localStorage.getItem( "connected" ) : false 
})

store.subscribe( value => { 
    localStorage.setItem( "nom"       , value.nom       != "null" ? value.nom       : null  ), 
    localStorage.setItem( "prenom"    , value.prenom    != "null" ? value.prenom    : null  ), 
    localStorage.setItem( "mail"      , value.mail      != "null" ? value.mail      : null  ),
    localStorage.setItem( "panier"    , value.panier    != "null" ? value.panier    : {}    ),
    localStorage.setItem( "connected" , value.connected != "null" ? value.connected : false ) 
})

// store.set( localStorage.getItem( "nom"       || ""    ) )
// store.set( localStorage.getItem( "prenom"    || ""    ) )
// store.set( localStorage.getItem( "mail"      || ""    ) )
// store.set( localStorage.getItem( "panier"    || {}    ) )
// store.set( localStorage.getItem( "connected" || false ) )

// store.nom      .set( localStorage.getItem( "nom"       || ""    ) )
// store.prenom   .set( localStorage.getItem( "prenom"    || ""    ) )
// store.mail     .set( localStorage.getItem( "mail"      || ""    ) )
// store.panier   .set( localStorage.getItem( "panier"    || {}    ) )
// store.connected.set( localStorage.getItem( "connected" || false ) )

// store.set( 
//     localStorage.getItem( "nom"       || ""    ),
//     localStorage.getItem( "prenom"    || ""    ),
//     localStorage.getItem( "mail"      || ""    ),
//     localStorage.getItem( "panier"    || {}    ),
//     localStorage.getItem( "connected" || false )
// )

// if( localStorage.getItem( "nom" ) != "null" || localStorage.getItem( "nom" ) != "undefined" ){
    // store.set({
    //     nom       : localStorage.getItem( "nom"       ) != "null" ? localStorage.getItem( "nom"       ) : null ,
    //     prenom    : localStorage.getItem( "prenom"    ) != "null" ? localStorage.getItem( "prenom"    ) : null ,
    //     mail      : localStorage.getItem( "mail"      ) != "null" ? localStorage.getItem( "mail"      ) : null ,
    //     panier    : localStorage.getItem( "panier"    ) != "null" ? localStorage.getItem( "panier"    ) : {} ,
    //     connected : localStorage.getItem( "connected" ) != "null" ? localStorage.getItem( "connected" ) : false 
    // })
// }