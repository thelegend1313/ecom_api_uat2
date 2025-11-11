const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload');//*
const uploadOpts={
    useTempFiles:true,
    tempFileDir:'/tmp/'
}

const { create, list, remove,importt} = require('../controllers/role')//*

const {authCheck, adminCheck  } = require('../middlewares/authCheck')


// @ENDPOINT http://localhost:5001/api/category
//router.post('/category', authCheck, adminCheck, create)
router.post('/role', authCheck, create)
router.get('/role', list)
//router.delete('/role/:id', authCheck, adminCheck, remove)
router.delete('/role/:id', authCheck, remove)
router.post('/role/import-excel',fileUpload(uploadOpts),importt)//*
module.exports = router