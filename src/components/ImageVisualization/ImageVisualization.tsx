import { useEffect, useState } from 'react'
import {
  MdOutlineZoomIn as ZoomIn,
  MdOutlineZoomOut as ZoomOut,
  MdOutlineClose as Close,
  MdOutlineNavigateNext as Next,
  MdOutlineNavigateBefore as Prev,
} from 'react-icons/md'

type ImageVisualizationProps = {
  imageUrl: string
  width?: string
}

// Component that visualizes image data
const ImageVisualization: React.FC<ImageVisualizationProps> = ({
  imageUrl,
  width = '300px',
}) => {
  const [isPopUpVisible, setPopUpVisible] = useState<boolean>(false)

  const handleImageClick = () => {
    setPopUpVisible(true)
  }

  const handleClosePopUp = () => {
    setPopUpVisible(false)
  }

  return (
    <div>
      <div className='mt-5 mb-5'>
        <img
          onClick={handleImageClick}
          style={{ cursor: 'pointer', width: width, height: 'auto' }}
          src={imageUrl}
          title='Click to enlarge'
          alt='Image'
        />
      </div>
      <ImagePopUp
        open={isPopUpVisible}
        imageUrl={imageUrl}
        onClose={handleClosePopUp}
      />
    </div>
  )
}

export default ImageVisualization

type ImagePopUpProps = {
  open: boolean
  imageUrl: string
  onClose: () => void
}

// Component that renders image(s) pop up
const ImagePopUp: React.FC<ImagePopUpProps> = ({ open, imageUrl, onClose }) => {
  const [width, setWidth] = useState<number>(500)
  const [index, setIndex] = useState<number>(0)
  const [images, setImages] = useState<string[]>([])
  const [imagesSize, setImagesSize] = useState<number>(0)

  const minWidth: number = 100
  const maxWidth: number = 2000

  const next = () => {
    if (index >= imagesSize - 1) {
      setIndex(0)
    } else {
      setIndex((p) => p + 1)
    }
  }

  const previous = () => {
    if (index <= 0) {
      setIndex(imagesSize - 1)
    } else {
      setIndex((p) => p - 1)
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    e.preventDefault()
    if (e.key === 'Escape') onClose()

    console.log(e.key)
  }

  useEffect(() => {
    setImages(JSON.parse(localStorage.getItem('imageUrls') || 'null'))
    if (images) {
      setIndex(images.indexOf(imageUrl))
      setImagesSize(images.length)
    }

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') onClose()
    })

    return () => {
      // cleanup
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [open])

  if (!images) {
    return 'pop up not working'
  }

  return (
    <div
      className={`${
        open ? 'flex' : 'hidden'
      } fixed left-0 top-0 w-screen h-screen items-center bg-slate-600/90 text-white z-50`}
    >
      {/* tools in the corners */}
      <div className='fixed top-2 right-4 justify-between flex p-1 px-4 lg:px-20'>
        <button
          className={`bg-slate-600 p-2 rounded-l-md ${
            width === maxWidth ? 'opacity-30' : 'hover:bg-slate-500'
          }`}
          onClick={() => setWidth((prev) => Math.min(prev + 100, maxWidth))}
          title='Zoom in'
        >
          {' '}
          <ZoomIn size={32} />{' '}
        </button>
        <button
          className={`bg-slate-600 p-2 ${
            width === minWidth ? 'opacity-30' : 'hover:bg-slate-500'
          }`}
          onClick={() => setWidth((prev) => Math.max(prev - 100, minWidth))}
          title='Zoom out'
        >
          {' '}
          <ZoomOut size={32} />{' '}
        </button>
        <button
          className='bg-slate-600 p-2 rounded-r-md flex items-center hover:bg-slate-500'
          onClick={onClose}
          title='Close'
        >
          {' '}
          <Close size={32} />
          /esc{' '}
        </button>
      </div>
      <div className='fixed top-2 left-4 justify-between flex p-1 mx-4 lg:mx-20'>
        <div className='fixed justify-between flex p-3 bg-slate-600 rounded-md lg:px-20 font-bold'>
          No {index + 1}
        </div>
      </div>
      {/* contents */}
      <div className='w-full flex justify-between items-center mx-10'>
        <button
          id='modal-prev-button'
          className='focus:outline rounded-md h-[40px] hover:opacity-50'
          onClick={() => {
            previous()
            document.getElementById('modal-prev-button')?.focus()
          }}
          title='Previous'
        >
          <Prev size={40} />
        </button>
        <img
          style={{
            width: `${width}px`,
            height: 'auto',
            transition: 'width .3s ease-in-out',
          }}
          src={images[index]}
          alt='Image'
        />
        <button
          id='modal-next-button'
          className='focus:outline rounded-md h-[40px] hover:opacity-50'
          onClick={() => {
            next()
            document.getElementById('modal-next-button')?.focus()
          }}
          title='Next'
        >
          <Next size={40} />
        </button>
      </div>
    </div>
  )
}
