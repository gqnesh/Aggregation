const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productControlller.js')

router.get('/test', ProductController.testMethod);
router.post('/getAllData', ProductController.getALlProductsTesting);
router.get('/getData', ProductController.getData)

module.exports = router