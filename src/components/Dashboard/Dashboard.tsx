import dynamic from 'next/dynamic'
import NamesInfo from '../NamesInfo'
import TextTwinDisplayButton from '../TextTwinDisplayButton'
//import AutogeneratedFields from './AutogeneratedFields'
import AutogeneratedFields from '../AutogeneratedFields'
import ImageViewer from '../ImageViewer'

interface Props {
  twin: any
}

// This component is the main display of the twin document.
const Dashboard: React.FC<Props> = ({ twin }) => {
  const ImageProps = {
    twinDocument: twin
  }
  // At the moment the location is hardcoded, since the solution to extract the coordinates of the twin is WIP.
  const mapCenter = { lat: 60.16010284423828, lng: 24.92174530029297 }
  const mapMarkers = [
    { lat: 60.16010284423828, lng: 24.92174530029297 },
    { lat: 60.21923893, lng: 24.910292833 },
  ]
  const Map = dynamic(() => import('../Map'), { ssr: false })

  // Check if the required fields exist in the twin object.
  const hasLocationData =
    twin &&
    'conveqs:lat' in twin &&
    'conveqs:lon' in twin &&
    typeof twin['conveqs:lat'] === 'number' &&
    typeof twin['conveqs:lon'] === 'number'

  return (
    <div id='dashboard-container' className='z-40'>
      <div className='fixed top-20 left-0'>{`>>`}</div>
      <div className='mx-8 lg:mx-24 space-y-10'>
        <NamesInfo
          name={twin.name}
          description={twin.description}
          twinid={twin['dt-id'] || twin.twinId}
        />
        <ImageViewer twinDocument={twin} />

        {/* Render Map only if the required fields exist */}
        {hasLocationData && mapCenter && mapMarkers && (
          <Map center={mapCenter} markers={mapMarkers} />
        )}

        <AutogeneratedFields twin={twin} />
        <TextTwinDisplayButton twin={twin} />
      </div>
      <div className='fixed top-20 right-0'>{`<<`}</div>
    </div>
  )
}

export default Dashboard