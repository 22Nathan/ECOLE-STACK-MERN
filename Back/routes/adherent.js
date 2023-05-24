const express = require('express')
const router = express.Router()
const Personne = require('../models/personne')

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
// GET ALL ADHERENTS
router.get('/', async (req, res) => {
    try {
        const adherents = await Personne.find().limit(10)
        res.setHeader('Content-Type', 'application/json')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// GET ADHERENT BY ID
router.get('/:id', getAdherent, (req, res) => {
    res.json(res.personne)
})


// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// CREATE ADHERENT
router.post('/', async (req, res) => {

    const personne = new Personne({
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        mail: req.body.mail,
        mdp: req.body.mdp,
    })

    try {
        const newPersonne = await personne.save()
        res.status(201).json(newPersonne)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// UPDATE ADHERENT

router.put('/:id', getPersonne, async (req, res) => {
    
    if (req.body.nom != null)       { res.produit.nom = req.body.nom }
    if (req.body.prenom != null)       { res.produit.prenom = req.body.prenom }
    if (req.body.telephone != null) { res.produit.telephone = req.body.telephone }
    if (req.body.mail != null)    { res.produit.mail = req.body.mail }
    if (req.body.mdp != null)        { res.produit.mdp = req.body.mdp }

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