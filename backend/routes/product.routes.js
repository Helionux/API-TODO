const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productsController');
const upload = require('../middlewares/upload');

router.post('/', upload.single('image'), productCtrl.createProduct);
router.put('/:id', upload.single('image'), productCtrl.updateProduct);

router.post('/', productCtrl.createProduct);
router.get('/', productCtrl.getProducts);
router.put('/:id', productCtrl.updateProduct);
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;