export interface PCDocument {
  id: string
  name: string
  slug: string
  priceChf: number
  /** Legacy price field used by older documents – prefer priceChf */
  price?: number
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
