import React, { useRef, useState } from 'react'

// Known field names to readable labes
enum imageFieldNameToLabel {
  'lvi:TT701' = 'Main image',
  'lvi:TT702' = 'Image 2',
  'lvi:TT703' = 'Image 3',
  'lvi:TT704' = 'Line drawing illustration',
  'lvi:TT705' = 'Scale image',
  'lvi:TT706' = 'Circuit diagram',
  'lvi:TT707' = 'Technical picture',
  'lvi:TT708' = 'Light distribution curve',
  'lvi:TT709' = 'Advertising image',
  'lvi:TT710' = 'Location picture / Miscellaneous',
  'lvi:TT711' = 'Energy sign',
}

type imageFieldName = keyof typeof imageFieldNameToLabel

type ImageVisualizationProps = {
  twinDocument: any
  width?: string
}

// Checks if image, more search strings to be added as needed

const isImage = (imageUrl: string) => {
  const searchStrings = ['image', '.jpg', '.jpeg', '.png', '.webp']
  let found = false
  searchStrings.forEach((s) => {
    if (imageUrl.toLowerCase().includes(s)) found = true
  })
  return found
}

// Component that visualizes image data

const ImageViewer: React.FC<ImageVisualizationProps> = ({
  twinDocument,
  width = '100px',
}) => {
  const imageUrls: string[] = []
  const imageNames: string[] = []
  const [showImagePopUp, setShowImagePopUp] = useState(false)

  // Gather imageUrls and imageNames from twinDocument
  // Check only first level keys, assuming all possible product images would be on first level

  Object.keys(twinDocument).forEach((key) => {
    const value: string = twinDocument[key]
    const imageUrl =
      typeof value == 'string' && value.startsWith('http') ? value : null
    if (imageUrl && isImage(imageUrl)) {
      imageUrls.push(imageUrl)
      const imageName = imageFieldNameToLabel[key as imageFieldName] ?? key
      imageNames.push(imageName)
    }
  })

  // If no image, return null

  if (imageUrls.length == 0) return null

  // Image display

  return (
    <div>
      <div className='mt-5 mb-5'>
        <p className='text-l mb-5'>
          {imageFieldNameToLabel[imageNames[0] as imageFieldName]}
        </p>
        <img
          onClick={() => setShowImagePopUp(true)}
          style={{ cursor: 'pointer', width: width, height: 'auto' }}
          src={imageUrls[0]}
          title={twinDocument.name}
        ></img>
        <button className='button mt-5' onClick={() => setShowImagePopUp(true)}>
          Open Image View
        </button>
      </div>
      {showImagePopUp && (
        <ImagePopUp
          imageUrls={imageUrls}
          imageNames={imageNames}
          onClose={() => setShowImagePopUp(false)}
        />
      )}
    </div>
  )
}

export default ImageViewer

type ImagePopUpProps = {
  imageUrls: string[]
  imageNames: string[]
  onClose: () => void
}

// Component that renders image pop up

const ImagePopUp: React.FC<ImagePopUpProps> = ({
  imageUrls,
  imageNames,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  return (
    <div className='image-popup-background'>
      <div className='image-popup'>
        <button className='button' onClick={onClose}>
          x
        </button>
        <div className='image-name'>{imageNames[activeImageIndex]}</div>
        <div className='large-image-area'>
          {activeImageIndex > 0 && (
            <button
              className='button left-button'
              onClick={() => setActiveImageIndex((prev) => prev - 1)}
            >
              {'<'}
            </button>
          )}
          <img
            style={{ width: '400px', height: 'auto' }}
            src={imageUrls[activeImageIndex]}
          ></img>
          {activeImageIndex < imageUrls.length - 1 && (
            <button
              className='button right-button'
              onClick={() => setActiveImageIndex((prev) => prev + 1)}
            >
              {'>'}
            </button>
          )}
        </div>
        <div className='image-selection'>
          {imageUrls.map((imageUrl, index) => {
            return (
              <img
                onClick={() => setActiveImageIndex(index)}
                className='image-icon'
                key={imageUrl}
                src={imageUrl}
              ></img>
            )
          })}
        </div>
      </div>
    </div>
  )
}
