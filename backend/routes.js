const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Cluster = require('./models/cluster.model')
const Hexagon = require('./models/hexagon.model')

router.get('/cluster/:id', (req, res, next) => {
  if (req.params.id) {
    Cluster.findOne({ _id: req.params.id })
      .populate('hexagons')
      .then(data => {
        return res.json({ success: true, data })
      })
      .catch(next)
  } else {
    res.status(400)
  }
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

router.post('/hex', (req, res, next) => {
  if (req.body) {
    Hexagon.create({
      ...req.body,
      _id: mongoose.Types.ObjectId(),
      cluster: mongoose.Types.ObjectId(req.body.cluster)
    })
      .then(hex => {
        Cluster.findOneAndUpdate(
          { _id: hex.cluster },
          { $push: { hexagons: mongoose.Types.ObjectId(hex._id) } },
          { new: true, useFindAndModify: false }
        )
          .populate('hexagons')
          .exec((err, data) => {
            if (err) {
              console.error(err)
            }
            res.json({ success: true, data })
          })
      })
      .catch(next)
  } else {
    res.status(400)
  }
})

module.exports = router
