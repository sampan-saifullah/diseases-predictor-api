const express = require('express')
const router = express.Router()
const SymptopmModel = require('../models/symptom')

router.get('/', async (req, res) => {
    const data = await SymptopmModel.find().sort({
        createdAt: -1
    })
    res.json(data)
})
router.post('/', async (req, res) => {
    const data = new SymptopmModel(req.body)
    const r = await data.save()
    res.json({
        data: r
    })
})
router.post('/:id', async (req, res) => {
    const body = req.body
    const data = await SymptopmModel.findByIdAndUpdate({
        _id: req.params.id
    }, body, { new: true })
    res.json(data)
})
router.delete('/:id', async (req, res) => {
    await SymptopmModel.findByIdAndDelete(req.params.id)
    res.json({
        msg: 'success'
    })
})

module.exports = router