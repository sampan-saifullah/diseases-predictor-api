const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const DiseasesModel = require('../models/diseases')


router.get('/', async (req, res) => {
    const data = await DiseasesModel.find().populate('specalist').populate('symptoms').sort({
        createdAt: -1
    })
    res.json(data)
})
router.post('/', async (req, res) => {
    const data = new DiseasesModel(req.body)
    const r = await data.save()
    res.json({
        data: r
    })
})
router.post('/:id', async (req, res) => {
    const body = req.body
    const data = await DiseasesModel.findByIdAndUpdate({
        _id: req.params.id
    }, body, { new: true })
    res.json(data)
})
router.delete('/:id', async (req, res) => {
    await DiseasesModel.findByIdAndDelete(req.params.id)
    res.json({
        msg: 'success'
    })
})
router.post('/predictor/engine', async (req, res) => {
    const findSymtoms = []
    req.body.symptoms.forEach(element => {
        findSymtoms.push(new mongoose.Types.ObjectId(element))
    });
    const data = await DiseasesModel.aggregate([
        {
            "$addFields": {
                "matches": {
                    "$trunc": {
                        "$multiply": [
                            {
                                "$divide": [
                                    {
                                        "$size": {
                                            "$filter": {
                                                "input": "$symptoms",
                                                "as": "c",
                                                "cond": { "$in": ["$$c", allSymtoms] }
                                            }
                                        }
                                    },
                                    { "$size": "$symptoms" }
                                ]
                            },
                            100
                        ]
                    }
                }
            }
        },
        {
            "$lookup": {
                "from": "specalists",
                "localField": "specalist",
                "foreignField": "_id",
                "as": "specalist"
            }
        },
        { $unwind: '$specalist' },
        { $match: { matches: { $gte: 25 } } },
        {
            $sort: {
                matches: -1
            }
        }
    ])
    res.json(data)
})

module.exports = router