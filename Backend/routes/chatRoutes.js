const express = require('express')

const 
{accessChat,fetchChats,
    createGroupChat,renameGroup,addToGroup,removeFromGroup}

= require('../controllers/chatController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChats)
router.route('/group').post(protect,createGroupChat)
router.route('/rename').put(protect,renameGroup)
router.route('/groupAdd').put(protect,addToGroup)
router.route('/groupRemove').put(protect,removeFromGroup)



module.exports = router