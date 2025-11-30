import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage"
import { getFirebaseDb, getFirebaseStorage } from "./firebase"
import type { PCDocument } from "./types"

const PCS_COLLECTION = "pcs"

// Get all PCs
export async function getAllPCs(): Promise<PCDocument[]> {
  try {
    const db = getFirebaseDb()
    const pcsRef = collection(db, PCS_COLLECTION)
    const q = query(pcsRef, orderBy("isFeatured", "desc"), orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PCDocument[]
  } catch (error) {
    console.error("Error fetching PCs:", error)
    return []
  }
}

// Get PC by slug
export async function getPCBySlug(slug: string): Promise<PCDocument | null> {
  try {
    const db = getFirebaseDb()
    const pcsRef = collection(db, PCS_COLLECTION)
    const q = query(pcsRef, where("slug", "==", slug))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    const docData = snapshot.docs[0]
    return {
      id: docData.id,
      ...docData.data(),
    } as PCDocument
  } catch (error) {
    console.error("Error fetching PC by slug:", error)
    return null
  }
}

// Get PC by ID
export async function getPCById(id: string): Promise<PCDocument | null> {
  try {
    const db = getFirebaseDb()
    const docRef = doc(db, PCS_COLLECTION, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return null
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as PCDocument
  } catch (error) {
    console.error("Error fetching PC by ID:", error)
    return null
  }
}

// Create PC
export async function createPC(data: Omit<PCDocument, "id" | "createdAt" | "updatedAt">): Promise<string> {
  try {
    const db = getFirebaseDb()
    const now = Date.now()
    const docRef = await addDoc(collection(db, PCS_COLLECTION), {
      ...data,
      createdAt: now,
      updatedAt: now,
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating PC:", error)
    throw error
  }
}

// Update PC
export async function updatePC(id: string, data: Partial<PCDocument>): Promise<void> {
  try {
    const db = getFirebaseDb()
    const docRef = doc(db, PCS_COLLECTION, id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: Date.now(),
    })
  } catch (error) {
    console.error("Error updating PC:", error)
    throw error
  }
}

// Delete PC
export async function deletePC(id: string): Promise<void> {
  try {
    const db = getFirebaseDb()
    const storage = getFirebaseStorage()

    // Delete document
    const docRef = doc(db, PCS_COLLECTION, id)
    await deleteDoc(docRef)

    // Delete all images from storage
    try {
      const folderRef = ref(storage, `pcs/${id}`)
      const list = await listAll(folderRef)
      await Promise.all(list.items.map((item) => deleteObject(item)))
    } catch (storageError) {
      console.error("Error deleting images:", storageError)
    }
  } catch (error) {
    console.error("Error deleting PC:", error)
    throw error
  }
}

// Upload image
export async function uploadPCImage(pcId: string, file: File): Promise<string> {
  try {
    const storage = getFirebaseStorage()
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const storageRef = ref(storage, `pcs/${pcId}/${filename}`)

    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)

    return downloadURL
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

// Delete image
export async function deletePCImage(imageUrl: string): Promise<void> {
  try {
    const storage = getFirebaseStorage()
    // Extract path from URL
    const url = new URL(imageUrl)
    const pathMatch = url.pathname.match(/\/o\/(.+?)(\?|$)/)
    if (pathMatch) {
      const path = decodeURIComponent(pathMatch[1])
      const storageRef = ref(storage, path)
      await deleteObject(storageRef)
    }
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}
