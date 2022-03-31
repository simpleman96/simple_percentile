const {query_status} = require('../error_status')
const helper = require('../helper')
const db = require('../db')

exports.insert = (pool_id, data) => {
  // append to exist pool
  if (db.exist(pool_id)) {
    db.append(pool_id, data).then(_ => {})
    return 'appended'

  } else {
    // insert for new pool
    db.insert(pool_id, data).then(_ => {})
    return 'inserted'
  }
}

exports.get_percentile_value = (pool_id, p) => new Promise((resolve, reject) => {
  // check poolId exist?
  if (db.exist(pool_id)) {
    const pool = db.get(pool_id)
    const percentile_value = helper.get_percentile_value(pool, p)

    resolve({percentile_value, pool_size: pool.length})
  } else {
    // reject with NOT_EXIST status
    reject(query_status.NOT_EXIST)
  }
})