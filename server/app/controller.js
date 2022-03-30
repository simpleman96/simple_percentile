const repo = require('./repository')
const {query_status} = require('../error_status')

exports.insert = (req, res) => {
  const body = req.body
  const rs = repo.insert(body.poolId, body.poolValues)
  res.json({message: rs})
}

exports.query = (req, res) => {
  const body = req.body
  repo.get_percentile_value(body.poolId, body.percentile)
    .then(rs => res.json(rs))
    .catch(err => {
      if (err === query_status.NOT_EXIST) {
        res.status(400).json({error: err})
      } else {
        res.status(500).json({error: err})
      }
    })
}