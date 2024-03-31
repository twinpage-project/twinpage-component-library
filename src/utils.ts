
//import Cryptr from 'cryptr' // or this
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/authOptions'
const Cryptr = require('cryptr')

/**This function parses the twin document.
 *
 * @param {string} url - The url of twin to be fetched.
 * @returns A promise of the parsed twin as an object
 */

export async function parseTwinJSON(url: string): Promise<object> {
  let twinurl = url
  if (
    url.startsWith('https://dtid.org') ||
    url.startsWith('http://dtid.org') ||
    url.startsWith('dtid.org')
  ) {
    twinurl = await fetchDtDoc(url) // get host url from dtdoc
  }
  const response = await fetch(twinurl, { cache: 'no-store' })
  const twin = await response.json()
  return twin
}

// A helper function to fetch host url from dtid.org -type twins
export async function fetchDtDoc(dtid: string): Promise<string> {
  try {
    const response = await fetch(dtid)
    return `${response.url}/index.json`
  } catch (e) {
    console.error('--Error fetching DT doc:', e)
    return ''
  }
}

/**
 * Functions for crypting tokens information.
 * @function encrypt - Encrypts @param text.
 * @function decrypt - Decrypts @param text.
 */

export async function encrypt(text: string) {
  const secretKey = process.env.NEXTAUTH_SECRET || 'defaultsecret'
  const cryptr = new Cryptr(secretKey)
  const encrypted = cryptr.encrypt(text)
  return encrypted
}

export async function decrypt(text: string) {
  const secretKey = process.env.NEXTAUTH_SECRET || 'defaultsecret'
  const cryptr = new Cryptr(secretKey)
  const decrypted = cryptr.decrypt(text)
  return decrypted
}

/**
 * Functions for accessing session tokens.
 * @function getAccessToken @returns access token
 * @function getIdToken @returns id token
 */

export async function getAccessToken() {
  const session = await getServerSession(authOptions)
  if (session) {
    const token = await session.access_token
    const tokenDecrypted = decrypt(token)
    return tokenDecrypted
  }
  return null
}

export async function getIdToken() {
  const session = await getServerSession(authOptions)
  if (session) {
    const token = await session.id_token
    const tokenDecrypted = decrypt(token)
    return tokenDecrypted
  }
  return null
}

export async function sortByScores(
  inputObject: any
): Promise<{ [key: string]: string | object }> {
  const sortedEntries = Object.entries(inputObject).sort(
    ([keyA, a]: [string, unknown], [keyB, b]: [string, unknown]) => {
      const scoreA = (a as { score?: number })?.score ?? 0
      const scoreB = (b as { score?: number })?.score ?? 0
      return scoreB - scoreA
    }
  )
  const resultObject: { [key: string]: string | object } = sortedEntries.reduce(
    (obj, [key, value]) => {
      return {
        ...obj,
        [key]: (value as { '@value': string })?.['@value'] ?? value,
      }
    },
    {}
  )
  return resultObject
}

/* Function for extracting images from a JSON */
interface JsonObject {
  [key: string]: any
}

export async function extractImageUrls(
  obj: JsonObject,
  result: string[] = []
): Promise<string[]> {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]

      if (
        typeof value === 'string' &&
        (value.endsWith('.jpg') ||
          value.endsWith('.png') ||
          value.endsWith('.jpeg'))
      ) {
        result.push(value)
      } else if (typeof value === 'object') {
        extractImageUrls(value, result)
      }
    }
  }
  return result
}
