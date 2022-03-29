const express = require('express')
const controller = require('./controller')
const validator = require('./validator')

// setting
const app = express()
app.use(express.json())
const port = 3000

// route
app.post('/insert', controller.insert)
app.post('/query', controller.query)


// start
app.listen(port, (err) => {
  if (err) console.log(err)
  console.log(`Simple percentile app listening on port ${port}`)
})