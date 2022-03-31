const {body, validationResult} = require('express-validator')

/*
 * validate entity for insert api
 * - check exist for poolId, poolValues
 * - check array type for poolValues
 */
const insert_validator = () => {
  return [
    body('poolId').notEmpty().withMessage('Missing poolId field'),
    body('poolValues').notEmpty().withMessage('Missing poolValues field')
      .isArray().withMessage('poolValues is an array'),
  ]
}

/*
 * validate entity for query api
 * - check exist for poolId, percentile
 * - check value in range of [0.0, 100.0] for percentile
 */
const query_validator = () => {
  return [
    body('poolId').notEmpty().withMessage('Missing poolId field'),
    body('percentile').notEmpty().withMessage('Missing percentile field')
      .isFloat({ min:0.0, max: 100.0}).withMessage("percentile value in range of [0.0, 100.0]"),
  ]
}

/*
 * wrap validator func and handle validator error as a middleware chain
 */
const validator_chain = (func) => {
  const handler = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()})
    }
    next()
  }

  return [func(), handler]
}

module.exports = {
  insert_validator: validator_chain(insert_validator),
  query_validator: validator_chain(query_validator)
}