const { Router } = require('express');
const mainController = require('../controllers/MainController');
const { addQuotaLimiter } = require('../middleware/Middleware');
const router = Router();


router.get('/getProducts', mainController.getProducts_get);
router.get('/getContacts', mainController.getContacts_get);
router.get('/getCategories', mainController.getCategories_get);
router.get('/getProduct/:ref', mainController.getProduct_get);
router.get('/getProductsByCategory/:category', mainController.getProductsByCategory_get);
router.get('/getBillboard', mainController.getBillboard_get);
router.get('/getBillboardMb', mainController.getBillboardMb_get);
router.get('/getVideo', mainController.getVideo_get);


router.post('/addQuota', addQuotaLimiter, mainController.addQuota_post);

module.exports = router;
