import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage"
import { getFirebaseDb, getFirebaseStorage } from "./firebase"
import type { PCDocument } from "./types"

const PCS_COLLECTION = "pcs"
const LIST_TTL_MS = 60_000

let listCache: { data: PCDocument[]; ts: number } | null = null
let listInflight: Promise<PCDocument[]> | null = null
const slugCache = new Map<string, PCDocument>()
const idCache = new Map<string, PCDocument>()

function rememberPC(pc: PCDocument) {
  if (pc.slug) slugCache.set(pc.slug, pc)
  if (pc.id) idCache.set(pc.id, pc)
}

function invalidateCaches() {
  listCache = null
  slugCache.clear()
  idCache.clear()
}

function sortPCs(pcs: PCDocument[]): PCDocument[] {
  return [...pcs].sort((a, b) => {
    const af = a.isFeatured ? 1 : 0
    const bf = b.isFeatured ? 1 : 0
    if (af !== bf) return bf - af
    return (b.createdAt ?? 0) - (a.createdAt ?? 0)
  })
}

// Get all PCs
export async function getAllPCs(force = false): Promise<PCDocument[]> {
  if (!force && listCache && Date.now() - listCache.ts < LIST_TTL_MS) {
    return listCache.data
  }
  if (listInflight) return listInflight

  listInflight = (async () => {
    try {
      const db = getFirebaseDb()
      const pcsRef = collection(db, PCS_COLLECTION)
      const snapshot = await getDocs(pcsRef)

      const data = sortPCs(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as PCDocument[]
      )

      data.forEach(rememberPC)
      listCache = { data, ts: Date.now() }
      return data
    } catch (error) {
      console.error("Error fetching PCs:", error)
      return []
    } finally {
      listInflight = null
    }
  })()

  return listInflight
}

// Get PC by slug
export async function getPCBySlug(slug: string): Promise<PCDocument | null> {
  const cached = slugCache.get(slug)
  if (cached) return cached

  try {
    const db = getFirebaseDb()
    const pcsRef = collection(db, PCS_COLLECTION)
    const q = query(pcsRef, where("slug", "==", slug))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return null
    }

    const docData = snapshot.docs[0]
    const pc = {
      id: docData.id,
      ...docData.data(),
    } as PCDocument

    rememberPC(pc)
    return pc
  } catch (error) {
    console.error("Error fetching PC by slug:", error)
    return null
  }
}

// Get PC by ID
export async function getPCById(id: string): Promise<PCDocument | null> {
  const cached = idCache.get(id)
  if (cached) return cached

  try {
    const db = getFirebaseDb()
    const docRef = doc(db, PCS_COLLECTION, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return null
    }

    const pc = {
      id: docSnap.id,
      ...docSnap.data(),
    } as PCDocument

    rememberPC(pc)
    return pc
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
    invalidateCaches()
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
    invalidateCaches()
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
    invalidateCaches()

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
