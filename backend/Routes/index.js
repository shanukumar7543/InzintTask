const express = require('express')
const router = express.Router()
const api = require('../Controller')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

/** Upload file */
router.post('/file/upload', upload.single('file'), api.uploadFile)

/** Get all file */
router.get('/file/getAll', api.getAllFiles)

/** Get file from s3  */
router.get('/file/getDetail/:id', api.getFileFromS3)

module.exports = router
