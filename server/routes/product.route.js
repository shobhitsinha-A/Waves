const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const auth = require('../middleware/auth');
const { addProductValidator } = require('../middleWare/validations')
const formidableMiddleware = require('express-formidable');

router.post('/', auth('createAny','product'),addProductValidator,productsController.addProduct);

router.route('/product/:id')
.get(productsController.getProductById)
.patch(auth('updateAny','product'),productsController.updateProductById)
.delete(auth('deleteAny','product'),productsController.deleteProductById)

router.get('/all', productsController.allProducts);
//why posting will be filtering pass by brand price etc
router.post('/paginate/all', productsController.paginateProducts)

//UPLOADING IMAGGEEE
router.post('/upload',auth('createAny','product'),formidableMiddleware(),productsController.picUpload)

module.exports = router;