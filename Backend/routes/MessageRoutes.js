const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { SendMessage, AllMessages } = require('../controllers/MessageController')


const router = express.Router()

router.route('/').post(protect,SendMessage)
router.route('/:chatId').get(protect,AllMessages)

module.exports = router