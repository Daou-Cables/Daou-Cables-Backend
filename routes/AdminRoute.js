const { Router } = require('express');
const adminController = require('../controllers/AdminController');
const router = Router();
const { requireAuth, requireLevelOne } = require('../middleware/Middleware');
const upload = require('../config/multerConfig');

//Level 1 admin routes
router.post('/addAdmin', requireAuth, requireLevelOne, adminController.addAdmin_post);
router.post('/deleteAdmin', requireAuth, requireLevelOne, adminController.deleteAdmin_post);
router.post('/editContact', requireAuth, requireLevelOne, adminController.editContact_post);
router.post('/changeBillboard', requireAuth, requireLevelOne, upload.single('picture'), adminController.changeBillboard_post);
router.post('/changeVideo', requireAuth, requireLevelOne, upload.single('video'), adminController.changeVideo_post);

router.get('/getAdmins', requireAuth, requireLevelOne, adminController.getAdmins_get);

//Level 2 admin routes
router.post('/addProduct', requireAuth, upload.fields([
    {name: 'picture', maxCount: 1 },
    {name: 'name', maxCount:1},
    {name:'ref',maxCount:1},
    {name:'description',maxCount:1}]), adminController.addProduct_post);
router.post('/deleteProduct', requireAuth, adminController.deleteProduct_post);
router.post('/editProduct', requireAuth, upload.fields([
    {name: 'picture', maxCount: 1 },
    {name: 'name', maxCount:1},
    {name:'ref',maxCount:1},
    {name:'description',maxCount:1}]), adminController.editProduct_post);
router.post('/readQuota', requireAuth, adminController.readQuota_post);
router.post('/deleteQuota', requireAuth, adminController.deleteQuota_post);
router.post('/addCategory', requireAuth, adminController.addCategory_post);
router.post('/deleteCategory', requireAuth, adminController.deleteCategory_post);

router.get('/getQuotas', requireAuth, adminController.getQuotas_get);


module.exports = router;

