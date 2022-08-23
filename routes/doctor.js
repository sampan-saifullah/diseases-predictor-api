const express = require('express')
const router = express.Router()
const DoctorModel = require('../models/doctor')


router.get('/', async (req, res) => {
    const data = await DoctorModel.find().populate('specalist').sort({
        createdAt: -1
    })
    res.json(data)
})
router.get('/:specialist', async (req, res) => {
    const data = await DoctorModel.find({
        specalist: req.params.specialist
    })
    res.json(data)
})
router.post('/', async (req, res) => {
    const data = new DoctorModel(req.body)
    const r = await data.save()
    res.json({
        data: r
    })
})
router.post('/:id', async (req, res) => {
    const body = req.body
    const data = await DoctorModel.findByIdAndUpdate({
        _id: req.params.id
    }, body, { new: true })
    res.json(data)
})
router.delete('/:id', async (req, res) => {
    await DoctorModel.findByIdAndDelete(req.params.id)
    res.json({
        msg: 'success'
    })
})

module.exports = router