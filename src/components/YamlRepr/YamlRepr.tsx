
import { useEffect, useState } from 'react'
//import yaml from 'js-yaml'
const yaml = require('js-yaml')

interface Props {
  twin: object
}

// This component displays the full twin document as a yaml text block
const YamlRepresentation: React.FC<Props> = ({ twin }) => {
  const [yamlData, setYamlData] = useState<string | null>(null)

  useEffect(() => {
    setYamlData(yaml.dump(twin))
  }, [twin])

  const renderYamlWithDepthStyles: any = (
    yamlObject: any,
    depth: number = 0
  ) => {
    try {
      return Object.entries(yamlObject).map(([key, value]) => (
        <div
          key={key}
          className={`ml-${
            depth * 30
          } border-l-2 border-solid border-gray-300 p-1 pl-6 break-all`}
        >
          <strong>{key}:</strong>{' '}
          {typeof value === 'object'
            ? renderYamlWithDepthStyles(value, depth + 1)
            : value}
        </div>
      ))
    } catch {
      return (
        <div
          className={`ml-${
            depth * 30
          } border-l-2 border-solid border-gray-300 p-1 pl-6 break-all`}
        >
          <p>{'something unknown'}</p>
        </div>
      )
    }
  }

  // displays the yaml representation of the twin
  return (
    <div className='w-full border-t border-b p-4 overflow-auto max-h-[600px]'>
      {yamlData ? (
        <div>{renderYamlWithDepthStyles(yaml.load(yamlData))}</div>
      ) : (
        'Loading YAML...'
      )}
    </div>
  )
}

export default YamlRepresentation
