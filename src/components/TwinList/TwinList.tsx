import { useState, useEffect } from 'react';
import Link from 'next/link'

const fetchData = () => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://api.twinbase.dev/twins/?public=true';
  const url = proxyUrl + apiUrl;

  return fetch(url)
      .then((res) => {
          if (!res.ok) {
              throw new Error('Could not retrieve twins');
          }
          return res.json();
      });
}; // https://cors-anywhere.herokuapp.com/corsdemo
// IMPORTANT: Click the link above and press "request temporary access to the demo server" this demo server can handle 50 cors request per hour, so it is suitable for development purposes but not for production
// TODO your own server

const TwinList: React.FC = () => {
  const [twins, setTwins] = useState<any[]>([]);

  useEffect(() => {
      fetchData()
          .then(data => {
              setTwins(data);
              console.log('--Twinbase results found:', data.length);
          })
          .catch(error => {
              console.error('Error fetching twins:', error);
          });
  }, []);

  return (
      <ul>
          {twins.map((twin: any, index: number) => (
              <li key={index}>
                  <Link
                      className='hover:text-blue-500 hover:underline'
                      href={`/twin/${encodeURIComponent(twin.twinId)}`}
                  >
                      <p className='overflow-hidden p-2'>{twin.name || twin.twinId}</p>
                  </Link>
              </li>
          ))}
      </ul>
  );
};

export default TwinList
/*, {
  mode: 'cors',
  credentials: 'include', // I also need something like headers here // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
})*/