const router = require('express').Router()
 
const userCtrl = require('../controllers/userCtrl')
const auth = require("../middleware/auth")
 
  
router.patch('/user/:id/roleusernoidantificado', auth, userCtrl.UserRoleNoIdentificado);
router.patch('/user/:id/roleuser', auth, userCtrl.assignUserRole);
router.patch('/user/:id/rolesuperuser', auth, userCtrl.assignSuperUserRole);
router.patch('/user/:id/rolemoderador', auth, userCtrl.assignModeratorRole);
router.patch('/user/:id/roleadmin', auth, userCtrl.assignAdminRole);
 
module.exports = router