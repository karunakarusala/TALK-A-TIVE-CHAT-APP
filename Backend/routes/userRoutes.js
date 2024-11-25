const express = require('express')
const {registerUser} = require('../controllers/usercontrol')
const {authUser} = require('../controllers/usercontrol')
const {allUsers} = require('../controllers/usercontrol')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

router.route("/user").post(registerUser)
router.post("/login",authUser)
router.get("/findUsers",protect,allUsers)

module.exports = router