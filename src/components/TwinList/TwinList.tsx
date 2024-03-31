import Link from 'next/link'

const fetchData = async () => {
    const res = await fetch('https://api.twinbase.dev/twins/?public=true', {
        mode: 'cors',
        credentials: 'include', // I also need something like headers here // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
      })
  if (!res.ok) {
    throw new Error('Could not retrive twins')
  }

  return res.json()
}

const TwinList: React.FC = async () => { // took the React.FC out of here letsee if it works
  const twins = await fetchData()
  console.log('--Twinbase results found:', twins.length)

  return (
    <ul>
      {twins.map((twin: any, index: any) => (
        <li key={index}>
          {/* {twin.twinId}  */}
          <Link
            className='hover:text-blue-500 hover:underline'
            href={`/twin/${encodeURIComponent(`${twin.twinId}`)}`}
          >
            <p className='overflow-hidden p-2'>{twin.name || twin.twinId}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TwinList
