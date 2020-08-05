const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Cluster = require('./models/cluster.model')
const Hexagon = require('./models/hexagon.model')

router.get('/cluster/:id', (req, res, next) => {
  if (req.params.id) {
    Cluster.findOne({ _id: req.params.id })
      .then(data => {
        res.json({ success: true, data })
      })
      .catch(next)
  }
  res.status(400)
})

router.post('/cluster', (req, res, next) => {
  //FIXME: use express promis router to avoid callback hell
  Cluster.create({
    _id: mongoose.Types.ObjectId(),
    hexagons: []
  })
    .then(cluster => {
      Hexagon.create({
        _id: mongoose.Types.ObjectId(),
        label: '0,0',
        x: 0,
        y: 0,
        column: 1,
        row: 1,
        neighbours: [],
        cluster: mongoose.Types.ObjectId(cluster._id)
      })
        .then(hex => {
          const hexObjectId = mongoose.Types.ObjectId(hex._id)
          Cluster.findOneAndUpdate(
            { _id: cluster._id },
            { $set: { hexagons: [hexObjectId] } },
            { new: true, useFindAndModify: false }
          )
            .populate('hexagons')
            .exec((err, data) => {
              if (err) {
                console.error(err)
              }

              res.json({
                success: true,
                data: data
              })
            })
        })
        .catch(next)
    })
    .catch(next)
})

router.put('/cluster', (req, res, next) => {
  if (req.body) {
    Cluster.findOneAndUpdate(
      { _id: req.id },
      { $set: { hexagons: req.hexagons } },
      { new: true, useFindAndModify: false }
    )
      .then(data => {
        res.json(data)
      })
      .catch(next)
  }
  res.status(400)
})

module.exports = router
