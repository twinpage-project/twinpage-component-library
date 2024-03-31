import { authOptions } from '../authOptions'
import { getServerSession } from 'next-auth'
import { getIdToken } from '../../../utils'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (session && process.env.NEXTAUTH_URL) {
    const idToken = await getIdToken()
    const url = `${
      process.env.END_SESSION_URL
    }?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
      process.env.NEXTAUTH_URL
    )}`

    try {
      const res = await fetch(url, { method: 'GET' })
      console.log(res)
    } catch (err) {
      console.log(err)
      return NextResponse.json({ status: 500 })
    }
    return NextResponse.json({ status: 200 })
  }
}
