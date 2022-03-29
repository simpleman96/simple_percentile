const repo = require('./repository')

exports.insert = (req, res) => {
  const body = req.body
  const rs = repo.insert(body.poolId, body.poolValues)
  res.json({message: rs})
}

exports.query = (req, res) => {
  const body = req.body
  repo.get_percentile_value(body.poolId, body.percentile)
    .then(rs => res.json(rs))
    .catch(err => res.json({err}))
}