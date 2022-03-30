## Overview

A simple RESTful API app written by expressjs. The app provide 2 post endpoints:

- insert api: insert an array of number (poolValue) identify by an id (poolId). If id exist, append the array to exist
  one.
- query api: given input (poolId, percentile), the apt return the calculated percentile value and pool size

For more details, see documentation below.

## Installation

- npm install

## Run

- npm start

## Test

### Postman test example:

POST: http://localhost:3000/insert
<br>
`{
"poolId": 123546,
"poolValues": [
1, 7, 2, 6
]
}`
<br>
<br>
POST: http://localhost:3000/insert
<br>
`{
"poolId": 123546,
"percentile": 70 }`

### Auto test with mocha

- npm test

## Documentation

The detailed description of 2 apis:

### Insert api:

**Request**

- method: POST
- path:  /insert
- content-type: application/json
- body:

| Field       | Data  type              | Required | Description        |
| ----------- | ------------------------|----------|--------------------|
| poolId      | number                  | yes      | Id of the pool     |
| poolValue   | array  or number        | yes      | Element in the pool| 

**Response**

|Case               | Output                   |
|-------------------|--------------------------|
|If not exist poolId|`{"message": "inserted"}` |
|If exist poolId:   |`{"message": "appended"}` |
|Error              |`{"error": (detail here)}`|

### Query api:

**Request**

- method: POST
- path:  /query
- content-type: application/json
- body:

| Field       | Data  type              | Required | Description        |
| ----------- | ------------------------|----------|--------------------|
| poolId      | number                  | yes      | Id of the pool     |
| percentile  | number                  | yes      | percentile threshold| 

**Response**

|Case               | Output                                   | Description                                           |
|-------------------|------------------------------------------|-------------------------------------------------------|
|If exist poolId:   |`{"percentile_value": 7, "pool_size": 4}` | - `percentile_value` is the value of `percentile` threshold calculated on pool with `poolId`<br>- `pool_size` is size of pool with with `poolId`|
|Error              |`{"error": (detail here)}`                |                                                       |