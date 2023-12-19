// src/app/config/firebaseAdminInit.ts
import admin, { ServiceAccount } from 'firebase-admin'
import * as serviceAccount from './final-projext-1d9c3-firebase-adminsdk-nm4gw-952f8ffb37.json'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  })
}

export { admin }
