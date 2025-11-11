const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload');//*
const uploadOpts={
    useTempFiles:true,
    tempFileDir:'/tmp/'
}
const { create, list, remove,importt } = require('../controllers/category')
const { authCheck, adminCheck } = require('../middlewares/authCheck')
router.post('/category/import-excel',fileUpload(uploadOpts),importt)//*
// @ENDPOINT http://localhost:5001/api/category
//router.post('/category', authCheck, adminCheck, create)
router.post('/category', authCheck, create)
router.get('/category', list)
//router.delete('/category/:id', authCheck, adminCheck, remove)
router.delete('/category/:id', authCheck, remove)






module.exports = router