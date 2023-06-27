const express = require('express');
const { createRequest, updateRequest, changeRequestState, getAllRequests, deleteRequest } = require('../controllers/request');
const { validateSchema, Schemas } = require('../middleware/validate');

const router = express.Router();

router.get('/', getAllRequests)
router.post('/', validateSchema(Schemas.request), createRequest)
router.put('/:id', updateRequest)
router.patch('/:id', changeRequestState)
router.delete('/:id', deleteRequest)

module.exports = router;