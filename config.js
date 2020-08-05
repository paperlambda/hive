const config = {
  baseApiUrl: process.env.API_HOST || 'http://localhost:4800',
  mongoDBUrl: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/hive'
}

module.exports = config
