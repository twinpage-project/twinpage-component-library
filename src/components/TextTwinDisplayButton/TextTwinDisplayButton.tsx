import { useState } from 'react'
import YamlRepresentation from '../YamlRepr'
import {
  HiMiniChevronDown as Show,
  HiMiniChevronUp as Hide,
} from 'react-icons/hi2'

interface Props {
  twin: object
}

// The component that is used to show and hide a component of choice
const TextTwinDisplayButton: React.FC<Props> = ({ twin }) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <div className='space-y-2'>
      <button
        onClick={() => setShow((p) => !p)}
        className='button'
        title='Show YAML here'
      >
        {show ? <Hide size={20} /> : <Show size={20} />}
        {show ? 'Hide' : 'Display'} twin YAML
      </button>
      {show ? <YamlRepresentation twin={twin} /> : null}
    </div>
  )
}

export default TextTwinDisplayButton
