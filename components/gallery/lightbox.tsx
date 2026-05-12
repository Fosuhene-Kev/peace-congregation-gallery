"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  GalleryPhoto,
  getDownloadUrl,
  getDriveViewImageUrl,
  getFullResolutionUrl,
} from "@/lib/gallery-data"
import { cn } from "@/lib/utils"

interface LightboxProps {
  photos: GalleryPhoto[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export function Lightbox({ photos, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentPhoto = photos[currentIndex]
  const minSwipeDistance = 50
  const [imageSrc, setImageSrc] = useState(() =>
    getFullResolutionUrl(photos[currentIndex].driveId)
  )
  const imageLoadAttempt = useRef(0)

  // Reset loaded state and image URL when photo changes
  useEffect(() => {
    imageLoadAttempt.current = 0
    setIsLoaded(false)
    setImageSrc(getFullResolutionUrl(currentPhoto.driveId))
  }, [currentPhoto.driveId])

  const handleImageError = useCallback(() => {
    if (imageLoadAttempt.current === 0) {
      imageLoadAttempt.current = 1
      setImageSrc(getDriveViewImageUrl(currentPhoto.driveId))
      setIsLoaded(false)
    } else {
      setIsLoaded(true)
    }
  }, [currentPhoto.driveId])

  // Handle touch start
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  // Handle touch move
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  // Handle touch end - detect swipe direction
  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && photos.length > 1) {
      onNext()
    }
    if (isRightSwipe && photos.length > 1) {
      onPrev()
    }
  }, [touchStart, touchEnd, onNext, onPrev, photos.length])

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      onClose()
    }
  }, [onClose])

  // Handle download
  const handleDownload = useCallback(() => {
    const link = document.createElement("a")
    link.href = getDownloadUrl(currentPhoto.driveId)
    link.download = `${currentPhoto.caption.replace(/[^a-z0-9]/gi, "_")}.jpg`
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [currentPhoto])

  return (
    <div
      ref={containerRef}
      onClick={handleBackdropClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${currentPhoto.caption}`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close lightbox"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation - Previous */}
      {photos.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous photo"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Navigation - Next */}
      {photos.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next photo"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main image area */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 pb-32 sm:pb-24">
        {/* Loading spinner */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Image */}
        <img
          src={imageSrc}
          alt={currentPhoto.caption}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          className={cn(
            "max-w-full max-h-full object-contain transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      {/* Bottom bar with caption and download */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Caption and counter */}
          <div className="text-center sm:text-left">
            <p className="text-white font-medium text-sm sm:text-base">
              {currentPhoto.caption}
            </p>
            <p className="text-white/60 text-xs sm:text-sm mt-1">
              Photo {currentIndex + 1} of {photos.length}
            </p>
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-[oklch(0.75_0.15_85)] hover:bg-[oklch(0.7_0.15_85)] text-[oklch(0.25_0.04_85)] font-semibold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[oklch(0.75_0.15_85)] focus:ring-offset-2 focus:ring-offset-black shadow-lg"
            aria-label={`Download ${currentPhoto.caption}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Photo
          </button>
        </div>
      </div>

      {/* Swipe hint for mobile */}
      {photos.length > 1 && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/40 text-xs sm:hidden flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Swipe to navigate
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      )}
    </div>
  )
}
