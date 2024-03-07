const { Router } = require('express');
const mainController = require('../controllers/MainController');
const router = Router();

router.get('/getProducts', mainController.getProducts_get);
router.get('/getContacts', mainController.getContacts_get);
router.get('/getCategories', mainController.getCategories_get);
router.get('/getProduct/:id', mainController.getProduct_get);
router.get('/getProductsByCategory/:category', mainController.getProductsByCategory_get);
router.get('/getMedia', mainController.getMedia_get);

router.post('/addQuota', mainController.addQuota_post);

module.exports = router;
