const {query_status} = require('../error_status')
const helper = require('../helper')
const db = require('../db')

exports.insert = (pool_id, data) => {
  if (db.exist(pool_id)) {
    db.append(pool_id, data).then(_ => {})
    return 'appended'
  } else {
    db.insert(pool_id, data).then(_ => {})
    return 'inserted'
  }
}

exports.get_percentile_value = (pool_id, p) => new Promise((resolve, reject) => {
  if (db.exist(pool_id)) {
    const pool = db.get(pool_id)
    const percentile_value = helper.get_percentile_value(pool, p)

    resolve({percentile_value, pool_size: pool.length})
  } else {
    reject(query_status.NOT_EXIST)
  }
})