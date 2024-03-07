const { Router } = require('express');
const mainController = require('../controllers/MainController');
const router = Router();

router.get('/getProducts', mainController.getProducts_get);
router.get('/getContacts', mainController.getContacts_get);
router.get('/getCategories', mainController.getCategories_get);
router.get('/getProduct/:id', mainController.getProduct_get);

module.exports = router;
