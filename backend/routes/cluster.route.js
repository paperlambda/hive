const express = require('express')
const mongoose = require('mongoose')
const clusterRoutes = express.Router()

clusterRoutes.route('/').post(function(req, res) {
  // const newHex = new HexagonModel({
  //   x: 0,
  //   y: 0,
  //   neighbours: []
  // })
  // const newCluster = new ClusterModel({
  //   _id: mongoose.Types.ObjectId(),
  //   hexagons: []
  // })
  //   .save()
  //   .then(cluster => {})
  res.status(200).json({ success: true })
})

module.exports = clusterRoutes
