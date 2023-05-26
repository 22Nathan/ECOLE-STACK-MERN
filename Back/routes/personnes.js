


const express = require('express')
const router = express.Router()
const Personne = require('../models/personne')
const mongooseConnection = require('../server')

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// MIDDLEWARE GET BY ID
async function getPersonne(req, res, next){
    let personne
    try {
        personne = await Personne.findOne({ id: req.params.id })
        if (personne == null) {
            return res.status(404).json({ message: 'Personne introuvable' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.personne = personne
    next()
}

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// MIDDLEWARE GET BY MAIL & PWD
async function getPersonneMailPwd(req, res, next){
    let personne
    try {
        personne = await Personne.findOne({ mail: req.params.mail , mdp: req.params.mdp })
        if (personne == null) {
            return res.status(404).json({ message: 'Personne introuvable' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.personne = personne
    next()
}

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// GET ALL
router.get('/', async (req, res) => {
    console.log('/')
    try {
        const personnes = await Personne.find().limit(10)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(personnes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// GET ADHERENT BY ID
router.get('/:id', getPersonne, (req, res) => {
    res.json(res.personne)
})

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// GET ADHERENT BY MAIL & PWD
router.get('/:mail/:mdp', getPersonneMailPwd, (req, res) => {
    res.json(res.personne)
})

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// CREATE
router.post('/', async (req, res) => {

    let length = await countCollectionLength('Personne')

    const personne = new Personne({
        id: (length+1) || 667,
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        mail: req.body.mail,
        mdp: req.body.mdp,
        admin: 0,
        panier: {},
    })

    try {
        const newPersonne = await personne.save()
        res.status(201).json(newPersonne)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// UPDATE

router.put('/:id', getPersonne, async (req, res) => {
    
    if (req.body.nom != null)       { res.personne.nom = req.body.nom }
    if (req.body.prenom != null)    { res.personne.prenom = req.body.prenom }
    if (req.body.telephone != null) { res.personne.telephone = req.body.telephone }
    if (req.body.mail != null)      { res.personne.mail = req.body.mail }
    if (req.body.mdp != null)       { res.personne.mdp = req.body.mdp }

    try {
        const updatedPersonne = await res.personne.save()
        res.json(updatedPersonne)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})


// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// DELETE ADHERENT
router.delete('/:id', getPersonne, async (req, res) => {
    try {
        await res.personne.deleteOne()
        res.status(200).json({ message: 'deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})




async function countCollectionLength(collection) {
    return await mongooseConnection.model(collection).countDocuments({}) || 0
}




module.exports = router