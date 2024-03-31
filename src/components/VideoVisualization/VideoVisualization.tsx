import React, { useState } from 'react'

// Component that visualizes video data
type VideoVisualizationProps = {
  videoUrl: string
  width?: string
}

export const isIFrameVideo = (videoUrl: string) => {
  const keywords = ['youtube.com', 'youtu.be', 'vimeo.com']
  let status = false
  keywords.forEach((keyword) => {
    if (videoUrl.indexOf(keyword) > -1) status = true
  })
  return status
}

export const isNormalVideo = (videoUrl: string) => {
  const keywords = ['.mp4', '.mov', '.avi']
  let status = false
  keywords.forEach((keyword) => {
    if (videoUrl.indexOf(keyword) > -1) status = true
  })
  return status
}

const VideoVisualization: React.FC<VideoVisualizationProps> = ({
  videoUrl,
  width = '300px',
}) => {
  const ensureEmbedUrl = () => {
    if (videoUrl.indexOf('youtu') > -1)
      return videoUrl.replace('watch?v=', 'embed/')
    if (videoUrl.indexOf('vimeo') > -1 && videoUrl.indexOf('player') < 0)
      return 'https://player.vimeo.com/video/' + videoUrl.split('/').pop()
    return videoUrl
  }

  return (
    <div>
      <div className='mt-5 mb-5'>
        {isIFrameVideo(videoUrl) ? (
          <iframe
            style={{ width: width, height: 'auto' }}
            src={ensureEmbedUrl()}
            allowFullScreen
          />
        ) : (
          <video
            style={{ width: width, height: 'auto' }}
            src={videoUrl}
            controls
          />
        )}
      </div>
    </div>
  )
}

export default VideoVisualization