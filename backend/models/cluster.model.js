const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClusterModel = Schema({
  _id: Schema.Types.ObjectId,
  hexagons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Hexagon'
    }
  ]
})

module.exports = mongoose.model('Cluster', ClusterModel)
