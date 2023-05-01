const express = require('express')
const cors = require('cors')
const app = new express()
const router = require('./Routes')
const fileupload = require('express-fileupload')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.use(fileupload())
app.use((error, req, res, next) => {})

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Invalid URL !!' })
})

const port = process.env.port || 5001

const server = app.listen(port, () => {
  console.log(`Server started successfully on port: ${port}`)
})
