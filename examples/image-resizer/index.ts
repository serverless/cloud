import { api, storage } from '@serverless/cloud'
import cors from 'cors'
import Jimp from 'jimp'

api.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

api.get('/api/image', async (req, res) => {
  const path = req.query.path as string
  try {
    return res.sendFile(path)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
})

api.upload('/api/new', async (req, res) => {
  const path = req.query.path as string
  const fileBuff = req.file.buffer
  if (!fileBuff) {
    return res.status(400).send('No file')
  }
  try {
    await storage.write(path, fileBuff)
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error.message)
  }
})

api.upload('/api/resize', async (req, res) => {
  const width = parseInt(req.query.width as string)
  const height = parseInt(req.query.height as string)

  const filename = req.query.filename as string

  if (!filename) {
    return res.status(400).send('Missing filename')
  }

  if (!req.file) {
    return res.status(400).send('No file found')
  }

  try {
    const fileBuff = req.file.buffer
    const image = await Jimp.read(fileBuff)
    image.resize(width, height)
    const resizedName = `resized-${filename}`
    const resizedBuff = await image.getBufferAsync(Jimp.MIME_JPEG)
    await storage.write(resizedName, resizedBuff)
    const downloadUrl = await storage.getDownloadUrl(resizedName)
    return res.status(200).send({ downloadUrl, name: resizedName, data: resizedBuff.toString('base64') })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
})

api.upload('/api/blur', async (req, res) => {
  const filename = req.query.filename as string
  const radius = parseInt(req.query.radius as string)

  if (!filename) {
    return res.status(400).send('Missing filename')
  }

  const exists = await storage.exists(filename)

  if (!req.file && !exists) {
    return res.status(400).send('No file found')
  }

  try {
    const fileBuff = req.file.buffer
    const image = await Jimp.read(fileBuff)
    image.blur(radius)
    await storage.write(`blurred-${filename}`, await image.getBufferAsync(Jimp.MIME_JPEG))
    const downloadUrl = await storage.getDownloadUrl(filename)
    return res.status(200).send({ downloadUrl })
  } catch (e) {
    console.error(e)
    return res.status(500).send(e)
  }
})

api.upload('/api/pixelate', async (req, res) => {
  const filename = req.query.filename as string
  if (!filename) {
    return res.status(400).send('Missing filename')
  }
  const exists = await storage.exists(filename)
  console.log(exists, 'exists')
  if (!req.file && !exists) {
    return res.status(400).send('No file found')
  }

  try {
    const fileBuff = req.file.buffer
    const image = await Jimp.read(fileBuff)
    image.pixelate(10)
    const newFilename = `pixelated-${filename}`
    await storage.write(newFilename, await image.getBufferAsync(Jimp.MIME_JPEG))
    const downloadUrl = await storage.getDownloadUrl(newFilename)
    return res.status(200).send({ downloadUrl })
  } catch (e) {
    console.error(e)
    return res.status(500).send(e)
  }
})
