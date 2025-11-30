export interface PCDocument {
  id: string
  name: string
  slug: string
  priceChf: number
  shortDescription: string
  longDescription: string
  cpu: string
  gpu: string
  ram: string
  storage: string
  motherboard?: string
  cooler?: string
  psu?: string
  caseModel?: string
  usageTags: string[]
  isFeatured: boolean
  images: string[]
  features?: string[]
  createdAt: number
  updatedAt: number
}
