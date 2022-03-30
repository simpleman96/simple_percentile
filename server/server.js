const express = require('express')
const controller = require('./app/controller')
const validator = require('./app/validator')

// setting
const app = express()
app.use(express.json())
const port = 3000

// route
app.post('/insert', validator.insert_validator, controller.insert)
app.post('/query', validator.query_validator, controller.query)


// start
app.listen(port, (err) => {
  if (err) console.log(err)
  console.log(`Simple percentile app listening on port ${port}`)
})

module.exports = app