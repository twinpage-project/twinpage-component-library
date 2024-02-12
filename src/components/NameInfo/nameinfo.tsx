'use client'
import * as React from 'react'

interface TwinInfo {
  data: {
    dtID: string
    hostingIri: string
    name: string
    description: string
    baseUrl: string
    edit: string
    editJson: string
  }
}

const data = {
  dtID: 'https://dtid.org/example-twin-e8fde635-e14a-41d7-85f0-676cd10cae32',
  hostingIri:
    'https://twinbase.github.io/twinbase/example-twin-e8fde635-e14a-41d7-85f0-676cd10cae32',
  name: 'Example twin',
  description:
    'This is an example twin to show what a DT document can look like. You can safely remove the folder that contains this document.',
  baseUrl: 'https://twinbase.github.io/twinbase',
  edit: 'https://github.com/twinbase/twinbase/edit/main/docs/example-twin-e8fde635-e14a-41d7-85f0-676cd10cae32/index.yaml',
  editJson:
    'https://github.com/twinbase/twinbase/edit/main/docs/example-twin-e8fde635-e14a-41d7-85f0-676cd10cae32/index.json',
}

const NameAndDescription = () => {
  return (
    <div className="">
      <h1 className="">{data.name}</h1>
      <p>description: {data.description}</p>
      <p>
        id: {data.dtID}
        <button
          className="button"
          title="copyTwinID"
          onClick={() => {
            navigator.clipboard.writeText(data.dtID)
          }}
        >
          copy
        </button>{' '}
      </p>
    </div>
  )
}

export default NameAndDescription

//to try add these to page.tsx

// import NameAndDescription from './nameInfo'

// const data = {
//   "dtID": "https://dtid.org/example-twin-e8fde635-e14a-41d7-85f0-676cd10cae32",
//   "hostingIri": "https://twinbase.github.io/twinbase/example-twin-e8fde635-e14a-41d7-85f0-676cd10cae32",
//   "name": "Example twin",
//   "description": "This is an example twin to show what a DT document can look like. You can safely remove the folder that contains this document.",
//   "baseUrl": "https://twinbase.github.io/twinbase",
//   "edit": "https://github.com/twinbase/twinbase/edit/main/docs/example-twin-e8fde635-e14a-41d7-85f0-676cd10cae32/index.yaml",
//   "editJson": "https://github.com/twinbase/twinbase/edit/main/docs/example-twin-e8fde635-e14a-41d7-85f0-676cd10cae32/index.json"
// }

{
  /* <div>
        < NameAndDescription data={data} />
      </div> */
}
