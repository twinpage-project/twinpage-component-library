import KeycloakProvider from 'next-auth/providers/keycloak'// mby this
import { jwtDecode } from 'jwt-decode'
import { encrypt } from '../../utils'
//const KeycloakProvider = require('next-auth/providers/keycloak')

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      issuer: `${process.env.AUTH_ISSUER}`,
    }),
  ],
  callbacks: {
    //@ts-expect-error
    async jwt({ token, account }) {
      const timeStamp = Math.floor(Date.now() / 1000)
      if (account) {
        token.decoded = jwtDecode(account.access_token)
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.expiresAt = account.expires_at
        token.refreshToken = account.refresh_token
        return token
      } else if (timeStamp < token.expiresAt) {
        return token // token has not expired, returning it
      } else {
        // token has expired
      }
    },
    //@ts-expect-error
    async session({ session, token }) {
      session.accessToken = encrypt(token.access_token)
      session.idToken = encrypt(token.id_token)
      session.roles = token.decoded.realm_access.roles
      return session
    },
  },
}
