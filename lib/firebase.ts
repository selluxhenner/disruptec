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
    apiKey: "AIzaSyAoSJdrI1fVhwDt2b2nXI2gsXGahoBLYAE",
    authDomain: "disruptec-25cc6.firebaseapp.com",
    projectId: "disruptec-25cc6",
    storageBucket: "disruptec-25cc6.appspot.com",
    messagingSenderId: "170840319214",
    appId: "1:170840319214:web:6b3a42722f85a0522d3fff",
    measurementId: "G-CG5STGPB9H",
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
