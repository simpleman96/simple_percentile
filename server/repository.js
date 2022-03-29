const db = {}

exports.insert = (pool_id, data) => {
  if (Object.keys(db).includes(pool_id)) {
    const pool = db[pool_id]
    data.forEach(v => pool.push(v))

  } else {
    db[pool_id] = data
  }
}

exports.get_percentile_value = (pool_id, p) => {

}