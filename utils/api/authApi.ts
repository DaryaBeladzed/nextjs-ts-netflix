import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import { firebaseAdmin } from '../firebaseAdmin'

export const checkUser = (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx)
  return firebaseAdmin.auth().verifyIdToken(cookies.token)
}
