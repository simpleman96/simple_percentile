const {body} = require('express-validator')

exports.insert_validator = () => {
  return [
    body('poolId').notEmpty().withMessage('Missing poolId field'),
    body('poolValue').notEmpty().withMessage('Missing poolValue field'),
  ]
}

exports.query_validator = () => {

}