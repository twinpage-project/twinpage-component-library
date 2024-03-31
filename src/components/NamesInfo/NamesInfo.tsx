
import { useState } from 'react'
import CopyButton from '../CopyButton'

interface Props {
  name: any
  description: any
  twinid: any
}

// This component displays the main attributes of a twin (from the attribute "twin"), Name, Desciption and DT ID. Component is used in dashboard component

const NamesInfo: React.FC<Props> = ({ name, description, twinid }) => {
  const [showNameCopy, setShowNameCopy] = useState<boolean>(false)
  const [showDescCopy, setShowDescCopy] = useState<boolean>(false)
  const [showIdCopy, setShowIdCopy] = useState<boolean>(false)

  return (
    <div className='space-y-6'>
      {name !== undefined ? (
        <div
          className='component-container'
          onMouseEnter={() => setShowNameCopy(true)}
          onMouseLeave={() => setShowNameCopy(false)}
        >
          <div className='component-container-key'>Name</div>
          <h1>{name}</h1>
          <div className='absolute top-1 right-1'>
            <CopyButton text={name} show={showNameCopy} />
          </div>
        </div>
      ) : (
        <div>
          <p>Name undefined</p>
        </div>
      )}
      {description !== undefined ? (
        <div
          className='component-container'
          onMouseEnter={() => setShowDescCopy(true)}
          onMouseLeave={() => setShowDescCopy(false)}
        >
          <div className='component-container-key'>Description</div>
          <p>{description}</p>
          <div className='absolute top-1 right-1'>
            <CopyButton text={description} show={showDescCopy} />
          </div>
        </div>
      ) : (
        <div>
          <p>Description undefined</p>
        </div>
      )}
      {twinid !== undefined ? (
        <div
          className='component-container'
          onMouseEnter={() => setShowIdCopy(true)}
          onMouseLeave={() => setShowIdCopy(false)}
        >
          <div className='component-container-key'>ID</div>
          <div className='pl-1 p-1 flex items-center'>
            <a
              href={twinid}
              className='hover:text-blue-500 hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              {twinid}
            </a>
          </div>
          <div className='absolute top-1 right-1'>
            <CopyButton text={twinid} show={showIdCopy} />
          </div>
        </div>
      ) : (
        <div>
          <p>ID undefined</p>
        </div>
      )}
    </div>
  )
}

export default NamesInfo
