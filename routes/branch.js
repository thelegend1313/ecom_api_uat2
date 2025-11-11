const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload');//*
const uploadOpts={
    useTempFiles:true,
    tempFileDir:'/tmp/'
}

const { create, list, remove,importt } = require('../controllers/branch')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

// @ENDPOINT http://localhost:5001/api/color
//router.post('/color', authCheck, adminCheck, create)
router.post('/branch/import-excel',fileUpload(uploadOpts),importt)//*
router.post('/branch', authCheck, create)
router.get('/branch', list)
//router.delete('/color/:id', authCheck, adminCheck, remove)
router.delete('/branch/:id', authCheck, remove)







module.exports = router