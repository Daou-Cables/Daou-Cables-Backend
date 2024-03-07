const { Router } = require('express');
const adminController = require('../controllers/AdminController');
const router = Router();
const { requireAuth, requireLevelOne } = require('../middleware/Middleware');

//Level 1 admin routes
router.post('/addAdmin', requireAuth, requireLevelOne, adminController.addAdmin_post);
router.post('/deleteAdmin', requireAuth, requireLevelOne, adminController.deleteAdmin_post);

router.get('/getAdmins', requireAuth, requireLevelOne, adminController.getAdmins_get);

//Level 2 admin routes
router.post('/addProduct', requireAuth, adminController.addProduct_post);

module.exports = router;

