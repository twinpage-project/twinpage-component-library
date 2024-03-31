//import NextAuth from 'next-auth' //o rthis
import { authOptions } from '../authOptions'
const NextAuth = require('next-auth')

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
