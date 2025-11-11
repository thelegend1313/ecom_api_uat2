const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload');//*
const uploadOpts={
    useTempFiles:true,
    tempFileDir:'/tmp/'
}

const { create, list, remove,importt } = require('../controllers/color')
const { authCheck, adminCheck } = require('../middlewares/authCheck')

// @ENDPOINT http://localhost:5001/api/color
//router.post('/color', authCheck, adminCheck, create)
router.post('/color/import-excel',fileUpload(uploadOpts),importt)//*
router.post('/color', authCheck, create)
router.get('/color', list)
//router.delete('/color/:id', authCheck, adminCheck, remove)
router.delete('/color/:id', authCheck, remove)






module.exports = router