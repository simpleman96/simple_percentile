const helper = require("./helper");
const db = {}

exports.exist = (pool_id) => {
  return pool_id in db
}

exports.append = async (pool_id, data) => {
  const pool = db[pool_id]

  // insert all new pool element to exist pool
  data.forEach(v => helper.append_to_sorted_array(pool, v))
}

exports.insert = async (pool_id, data) => {
  // save pool data with increasing order
  db[pool_id] = data.sort((a, b) => a - b)
}

exports.get = (pool_id) => {
  return db[pool_id]
}