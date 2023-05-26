

const express = require('express')
const router = express.Router()
const Produit = require('../models/produit')
const mongooseConnection = require('../server')



// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// MIDDLEWARE GET BY ID
async function getProduit(req, res, next) {
    let produit
    try {
        produit = await Produit.findOne({ id: req.params.id })
        if (produit == null) {
            return res.status(404).json({ message: 'not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.produit = produit
    next()
  }

  
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// GET ALL
router.get('/', async (req, res) => {
    try {
        const produits = await Produit.find().limit(10)
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(produits)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

  
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// GET BY ID
router.get('/:id', getProduit, (req, res) => {
    res.json(res.produit)
})
  

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// CREATE
router.post('/', async (req, res) => {

    let length = await countCollectionLength('Produit')

    const produit = new Produit({
        id: (length+1) || 667,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        made: req.body.made,
    })

    try {
        const newProduit = await produit.save()
        res.status(201).json(newProduit)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
  

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// UPDATE
router.put('/:id', getProduit, async (req, res) => {

    if (req.body.title != null)       { res.produit.title = req.body.title }
    if (req.body.price != null)       { res.produit.price = req.body.price }
    if (req.body.description != null) { res.produit.description = req.body.description }
    if (req.body.quantity != null)    { res.produit.quantity = req.body.quantity }
    if (req.body.made != null)        { res.produit.made = req.body.made }

    try {
        const updatedProduit = await res.produit.save()
        res.status(200).json(updatedProduit)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
  
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// DELETE
router.delete('/:id', getProduit, async (req, res) => {
    try {
        await res.produit.deleteOne()
        res.status(200).json({ message: 'deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function countCollectionLength(collection) {
    return await mongooseConnection.model(collection).countDocuments({}) || 0
}
  
module.exports = router