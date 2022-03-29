const {body} = require('express-validator')

exports.insert_validator = () => {
  return [
    body('poolId').notEmpty().withMessage('Missing poolId field'),
    body('poolValues').notEmpty().withMessage('Missing poolValues field'),
  ]
}

exports.query_validator = () => {
  return [
    body('poolId').notEmpty().withMessage('Missing poolId field'),
    body('percentile').notEmpty().withMessage('Missing percentile field'),
  ]
}