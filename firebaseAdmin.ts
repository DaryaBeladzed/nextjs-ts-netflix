import * as firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_ADMIN_PRIVAT_KEY
        ? process.env.FIREBASE_ADMIN_PRIVAT_KEY.replace(/\\n/gm, '\n')
        : undefined,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    }),
  })
}

export { firebaseAdmin }
