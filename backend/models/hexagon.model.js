const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HexagonModel = Schema({
  _id: Schema.Types.ObjectId,
  label: {
    type: String
  },
  x: {
    type: Number
  },
  y: {
    type: Number
  },
  column: {
    type: Number
  },
  row: {
    type: Number
  },
  neighbours: [
    {
      side: Number,
      hexagon: Schema.Types.ObjectId
    }
  ],
  cluster: {
    type: Schema.Types.ObjectId,
    ref: 'Cluster'
  }
})

module.exports = mongoose.model('Hexagon', HexagonModel)
