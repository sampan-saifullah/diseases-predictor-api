const express = require('express')
const router = express.Router()
const SpecalistModel = require('../models/specialist')


router.get('/', async (req, res) => {
    const data = await SpecalistModel.find().sort({
        createdAt: -1
    })
    res.json(data)
})
router.get('/list/:code', async (req, res) => {
    const data = await SpecalistModel.find({
        name: req.params.code
    }).sort({
        createdAt: -1
    })
    res.json(data)
})
router.post('/', async (req, res) => {
    const data = new SpecalistModel(req.body)
    const r = await data.save()
    res.json({
        data: r
    })
})
router.post('/:id', async (req, res) => {
    const body = req.body
    const data = await SpecalistModel.findByIdAndUpdate({
        _id: req.params.id
    }, body, { new: true })
    res.json(data)
})
router.delete('/:id', async (req, res) => {
    await SpecalistModel.findByIdAndDelete(req.params.id)
    res.json({
        msg: 'success'
    })
})

module.exports = router