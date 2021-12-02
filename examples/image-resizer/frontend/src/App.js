import * as React from 'react'
import { useState, useEffect } from 'react'
import { apiClient } from './api'
import { UploadButton } from './components/UploadButton'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import Slider from '@mui/material/Slider'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CircularProgress from '@mui/material/CircularProgress'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import useLocalStorage from './hooks/useLocalStorage'

const Loading = () => (
  <div style={{ alignSelf: 'center', justifyContent: 'center' }}>
    <CircularProgress />
  </div>
)

const ResizedImagesList = (props) => {
  const { resizedImages } = props
  return (
    <ImageList
      sx={{ width: '70vw', height: 600 }}
      style={{ alignSelf: 'center', justifyContent: 'center' }}
      width="100%"
      height={'100vh'}
      cols={5}
      rowHeight={200}
    >
      {resizedImages.map((image) => {
        return (
          <ImageListItem key={image}>
            <a href={image}>
              <img src={image} />
            </a>
          </ImageListItem>
        )
      })}
    </ImageList>
  )
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [resizedData, setResizedData] = useState({})
  const [resizedImages, setResizedImages] = useLocalStorage('resizedImages', [])

  const onFileChange = (event) => {
    setResizedData({})
    setSelectedFile(event.target.files[0])
  }

  const onImgLoad = ({ target }) => {
    setHeight(target.offsetHeight)
    setWidth(target.offsetWidth)
  }

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader()

      reader.onload = () => {
        setImage(reader.result)
      }

      reader.readAsDataURL(selectedFile)
    }
  }, [selectedFile])

  const resize = async () => {
    if (height <= 0 || width <= 0) {
      alert('Values need to be greater than 0')
      return
    }
    setLoading(true)
    const resizedName = `${width}w-${height}h-${selectedFile.name}`
    try {
      const res = await apiClient({
        url: `resize?filename=${resizedName}&width=${width}&height=${height}`,
        body: selectedFile,
        method: 'PUT'
      })
      setResizedData({
        url: res.downloadUrl,
        name: res.name,
        data: res.data
      })
      setResizedImages([...resizedImages, res.downloadUrl])
      setLoading(false)
    } catch (e) {
      setLoading(false)
      alert(e.message)
    }
  }

  const save = () => {
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([resizedData.data], { type: 'application/octet-stream' }))
    link.download = resizedData.name
    link.click()
    setTimeout(function () {
      window.URL.revokeObjectURL(link)
    }, 200)
  }

  return (
    <div
      style={{
        backgroundColor: 'black',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Stack direction="column">
        <div
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center'
          }}
        >
          <h2
            style={{
              color: 'white',
              textAlign: 'center',
              alignSelf: 'center',
              justifyContent: 'center'
            }}
          >
            Image Resizer
          </h2>
          <Stack direction="row">
            <p style={{ color: selectedFile && selectedFile.name ? '#fd5750' : 'white', textAlign: 'center' }}>
              {' '}
              {selectedFile ? selectedFile.name : 'Select a file'}{' '}
            </p>
            <Box width={20} />
            <UploadButton onFileChange={onFileChange} />
          </Stack>
          <Box height={40} />
        </div>
        {image && (
          <Stack
            style={{ paddingBottom: 100, alignSelf: 'center' }}
            direction="column"
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
          >
            <Stack direction="row">
              <TextField
                value={width}
                onChange={(event) => setWidth(event.target.value)}
                variant="filled"
                label="width"
                style={{ backgroundColor: 'white' }}
                type={'number'}
              />
              <Box width={'50%'} />
              <TextField
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                variant="filled"
                label="height"
                style={{ backgroundColor: 'white' }}
                type={'number'}
              />
            </Stack>
            <div
              style={{
                borderRadius: 0,
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                flex: 1
              }}
            >
              {loading ? (
                <Loading />
              ) : (
                <img
                  onLoad={onImgLoad}
                  src={resizedData.url || image}
                  alt="Image"
                  style={{
                    borderRadius: 5,
                    width: '100%',
                    height: '100%',
                    maxWidth: '70vw',
                    maxHeight: '70vh',
                    alignSelf: 'center',
                    justifyContent: 'center'
                  }}
                />
              )}
            </div>
            <Button onClick={resize} variant="outlined" startIcon={<AutoAwesomeIcon />}>
              {' '}
              Resize{' '}
            </Button>
            {resizedData.url && (
              <Button onClick={save} variant="outlined" startIcon={<SaveAltIcon />}>
                {' '}
                Save{' '}
              </Button>
            )}
          </Stack>
        )}
        <div style={{ alignSelf: 'center', justifyContent: 'center' }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}> History </h2>
          {resizedImages.length > 0 && <ResizedImagesList resizedImages={resizedImages} />}
        </div>
      </Stack>
    </div>
  )
}

export default App
