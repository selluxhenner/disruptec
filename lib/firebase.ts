import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

let app: FirebaseApp | undefined
let db: Firestore | undefined
let storage: FirebaseStorage | undefined

function initializeFirebase() {
  if (app) return { app, db: db!, storage: storage! }

  // Check if we're in the browser and have the required env vars
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be initialized in the browser")
  }

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  // Validate config
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error("Firebase configuration is incomplete. Please check your environment variables.")
  }

  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }

  db = getFirestore(app)
  storage = getStorage(app)

  return { app, db, storage }
}

// Getter functions that initialize on first use
export function getFirebaseApp(): FirebaseApp {
  const { app } = initializeFirebase()
  return app
}

export function getFirebaseDb(): Firestore {
  const { db } = initializeFirebase()
  return db
}

export function getFirebaseStorage(): FirebaseStorage {
  const { storage } = initializeFirebase()
  return storage
}

// Legacy exports for backward compatibility
export { getFirebaseApp as app, getFirebaseDb as db, getFirebaseStorage as storage }
