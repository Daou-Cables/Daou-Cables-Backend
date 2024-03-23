const { Router } = require('express');
const authController = require('../controllers/AuthController');
const router = Router();
const { requireAuth } = require('../middleware/Middleware');

router.post('/login', authController.login_post);
router.post('/auth/refreshToken', authController.refreshToken_post);
router.post('/logout', requireAuth, authController.logout_post);

module.exports = router;