"use client";

import React, { useEffect, useState, useCallback } from "react";
import { X, Download, Heart, Share2, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { apiData } from "@/lib/api";

// Types
interface DriveImage {
  id: string;
  url: string;
  title: string;
  width?: number;
  height?: number;
  downloadUrl?: string;
}



export default function DriveGallery() {
  const [images, setImages] = useState<DriveImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<DriveImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Extract data from apiData
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get images from apiData
        const componentData:any = apiData.find(
          (c): c is any => c.component === "DriveGallery"
        )?.data;
        const serverImages = componentData?.images ?? [];

        // Try to fetch additional images from server, fallback to apiData images
        try {
          const response = await fetch("/api/drive-images");
          if (response.ok) {
            const additionalImages: DriveImage[] = await response.json();
            setImages([...serverImages, ...additionalImages]);
          } else {
            throw new Error("Server unavailable");
          }
        } catch {
          // Fallback to apiData images
          setImages(serverImages);
        }
      } catch (err) {
        setError("Failed to load images. Please try again later.");
        console.error("Error in DriveGallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const openModal = useCallback((image: DriveImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  }, []);

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedImage) return;

      const newIndex =
        direction === "prev"
          ? (currentIndex - 1 + images.length) % images.length
          : (currentIndex + 1) % images.length;

      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    },
    [selectedImage, currentIndex, images]
  );

  const toggleLike = useCallback((imageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  }, []);

  const handleDownload = useCallback((image: DriveImage, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = image.downloadUrl || image.url;
    link.download = image.title;
    link.click();
  }, []);

  const handleShare = useCallback((image: DriveImage, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: image.title,
        url: image.url,
      });
    } else {
      navigator.clipboard.writeText(image.url);
      alert("Image URL copied to clipboard!");
    }
  }, []);

  // Create rows with dynamic scrolling speed based on number of images
  const createRows = (images: DriveImage[]) => {
    const itemsPerRow = Math.max(8, Math.min(15, Math.ceil(images.length / 4)));
    const rows: DriveImage[][] = [];

    for (let i = 0; i < 4; i++) {
      const startIndex = (i * itemsPerRow) % images.length;
      const row: DriveImage[] = [];

      for (let j = 0; j < itemsPerRow; j++) {
        const imageIndex = (startIndex + j) % images.length;
        row.push(images[imageIndex]);
      }

      rows.push(row);
    }

    return rows;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          navigateImage("prev");
          break;
        case "ArrowRight":
          navigateImage("next");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedImage, closeModal, navigateImage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16 bg-white min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading amazing images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-16 bg-white min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="flex justify-center items-center py-16 bg-white min-h-screen">
        <p className="text-gray-600 text-xl">No images found.</p>
      </div>
    );
  }

  const rows = createRows(images);
  const animationDuration = Math.max(30, Math.min(90, images.length * 2));

  return (
    <>
      <section className="bg-white py-16 min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Helping Hands Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the heartwarming moments captured in our work. Click any image to see the impact of your support.
            </p>
          </div>

          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="overflow-hidden relative group"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 100px, black calc(100% - 100px), transparent)",
                }}
              >
                <div
                  className="flex gap-6 will-change-transform"
                  style={{
                    animation: `scroll-${rowIndex % 2 === 0 ? "right" : "left"} ${animationDuration}s linear infinite`,
                    width: `${row.length * 2 * 280}px`,
                  }}
                >
                  {[...row, ...row, ...row].map((img, i) => {
                    const originalIndex = images.findIndex((image) => image.id === img.id);
                    return (
                      <div
                        key={`${rowIndex}-${i}`}
                        className="w-64 h-48 relative rounded-2xl overflow-hidden shadow-lg bg-white flex-shrink-0 cursor-pointer group/item transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10"
                        onClick={() => openModal(img, originalIndex)}
                        onMouseEnter={() => setHoveredImage(img.id)}
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                          loading="lazy"
                        />

                        {/* Overlay */}
                        <div
                          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                            hoveredImage === img.id ? "opacity-100" : "opacity-0"
                          }`}
                        />

                        {/* Title */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-white font-medium text-sm truncate">
                            {img.title.replace(/\.[^/.]+$/, "")}
                          </h3>
                        </div>

                        {/* Hover Actions */}
                        <div
                          className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${
                            hoveredImage === img.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                          }`}
                        >
                          <button
                            onClick={(e) => toggleLike(img.id, e)}
                            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                              likedImages.has(img.id)
                                ? "bg-red-500 text-white"
                                : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                          >
                            <Heart size={16} fill={likedImages.has(img.id) ? "currentColor" : "none"} />
                          </button>
                          <button
                            onClick={(e) => handleShare(img, e)}
                            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
                          >
                            <Share2 size={16} />
                          </button>
                          <button
                            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
                          >
                            <ZoomIn size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-right {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }

          @keyframes scroll-left {
            0% {
              transform: translateX(-33.333%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .group:hover [style*="animation"] {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl max-h-full w-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <div className="flex items-center justify-center h-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedImage.title.replace(/\.[^/.]+$/, "")}</h3>
                  <p className="text-sm text-gray-300">
                    Image {currentIndex + 1} of {images.length}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => toggleLike(selectedImage.id, e)}
                    className={`p-3 rounded-full transition-colors ${
                      likedImages.has(selectedImage.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    <Heart size={20} fill={likedImages.has(selectedImage.id) ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={(e) => handleDownload(selectedImage, e)}
                    className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <Download size={20} />
                  </button>
                  <button
                    onClick={(e) => handleShare(selectedImage, e)}
                    className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
