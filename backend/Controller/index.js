const model = require('../models')
const AWS = require('aws-sdk')

const ACCESS_KEY = process.env.ACCESS_KEY,
  SECRET_KEY = process.env.SECRET_KEY,
  S3_REGION = process.env.S3_REGION
const s3Client = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: S3_REGION,
})

const uploadParams = {
  Bucket: process.env.S3_BUCKET, // pass name
  Key: '', // pass key
  Body: null, // pass file body
}

exports.uploadFile = async (req, res, next) => {
  try {
    const random = Date.now()
    const filename = random + req.file.originalname
    const params = uploadParams
    uploadParams.Key = filename
    uploadParams.Body = req.file.buffer
    const data = await s3Client
      .upload(params, (err, data) => {
        console.log('data', data)
        if (err) {
          res.status(500).json({ error: 'Error -> ' + err })
        }
        location = data.Location
      })
      .promise()

    console.log('Daaa', data)
    await model.files.create({
      videopath: data.Location,
      video_filename: filename,
    })
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.originalname,
      location: data.Location,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Internal Server Error !!'
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getAllFiles = async (req, res, next) => {
  try {
    const data = await model.files.findAll()
    res.json({
      message: 'data Get Successfully',
      data,
    })
  } catch (error) {
    if (!err.statusCode) {
      err.message = 'Internal Server Error !!'
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getFileFromS3 = async (req, res, next) => {
  try {
    const { id } = req.params
    const params = uploadParams
    uploadParams.Key = id
    const data = await s3Client.getObject(params).promise()
    res.json({
      message: 'data Get Successfully',
      data,
    })
  } catch (error) {
    if (!err.statusCode) {
      err.message = 'Internal Server Error !!'
      err.statusCode = 500
    }
    next(err)
  }
}
