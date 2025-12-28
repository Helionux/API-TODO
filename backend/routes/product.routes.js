const express = require('express');

const router = express.Router();


const { getAllProducts, createProduct, updatedProduct, deletedProduct } = require('../controllers/productsController');

router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updatedProduct);
router.delete('/:id', deletedProduct);


module.exports = router;