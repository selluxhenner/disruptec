"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-card">
        <img
          src={images[selectedImage] || "/placeholder.svg"}
          alt={`${alt} - Bild ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105",
                selectedImage === index
                  ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "border-border hover:border-primary/50",
              )}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${alt} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
