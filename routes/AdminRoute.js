const { Router } = require('express');
const adminController = require('../controllers/AdminController');
const router = Router();
const { requireAuth, requireLevelOne } = require('../middleware/Middleware');

//Level 1 admin routes
router.post('/addAdmin', requireAuth, requireLevelOne, adminController.addAdmin_post);
router.post('/deleteAdmin', requireAuth, requireLevelOne, adminController.deleteAdmin_post);
//router.post('/editContact', requireAuth, requireLevelOne, adminController.editContact_post);
//router.post('/editAdmin', requireAuth, requireLevelOne, adminController.editAdmin_post);

router.get('/getAdmins', requireAuth, requireLevelOne, adminController.getAdmins_get);

//Level 2 admin routes
router.post('/addProduct', requireAuth, adminController.addProduct_post);
//router.post('/deleteProduct', requireAuth, adminController.deleteProduct_post);
//router.post('/editProduct', requireAuth, adminController.editProduct_post);

module.exports = router;

