const express = require('express')
const router = express.Router()
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const fileUpload = require('express-fileupload');//*
const uploadOpts={
    useTempFiles:true,
    tempFileDir:'/tmp/'
}
const {
    listUsers,
    changeStatus,
    changeRole,
    userCart,
    getUserCart,
    emptyCart,
    saveAddress,
    saveOrder,
    getOrder,importt
} = require('../controllers/user')

//router.get('/users', authCheck, adminCheck, listUsers)
router.get('/users', authCheck, listUsers)
router.post('/change-status', authCheck, adminCheck, changeStatus)
router.post('/change-role', authCheck, adminCheck, changeRole)

router.post('/user/cart', authCheck,userCart)
router.get('/user/cart', authCheck, getUserCart)
router.delete('/user/cart', authCheck, emptyCart)

router.post('/user/address', authCheck, saveAddress)

router.post('/user/order', authCheck, saveOrder)
router.get('/user/order', authCheck, getOrder)

router.post('/user/import-excel',fileUpload(uploadOpts),importt)//*


module.exports = router