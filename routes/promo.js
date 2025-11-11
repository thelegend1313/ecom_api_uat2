const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload');//*
const uploadOpts={
    useTempFiles:true,
    tempFileDir:'/tmp/'
}




const { create, list, remove ,importt} = require('../controllers/promo')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

// @ENDPOINT http://localhost:5001/api/color
//router.post('/color', authCheck, adminCheck, create)
router.post('/promo', authCheck, create)
router.get('/promo', list)
//router.delete('/color/:id', authCheck, adminCheck, remove)
router.post('/promo/import-excel',fileUpload(uploadOpts),importt)//*
router.delete('/promo/:id', authCheck, remove)







module.exports = router