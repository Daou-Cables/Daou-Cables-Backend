const { Router } = require('express');
const adminController = require('../controllers/AdminController');
const router = Router();
const { requireAuth, requireLevelOne } = require('../middleware/Middleware');

//Level 1 admin routes
router.post('/addAdmin', requireAuth, requireLevelOne, adminController.addAdmin_post);
router.post('/deleteAdmin', requireAuth, requireLevelOne, adminController.deleteAdmin_post);

router.get('/getAdmins', requireAuth, requireLevelOne, adminController.getAdmins_get);

module.exports = router;

