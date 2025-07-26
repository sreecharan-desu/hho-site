// @ts-nocheck

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Download, Heart, Share2, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { apiData } from "@/lib/api";

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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const componentData: any = apiData.find(
          (c): c is any => c.component === "DriveGallery"
        )?.data;
        const serverImages = componentData?.images ?? [];

        try {
          const response = await fetch("/api/drive-images");
          if (response.ok) {
            const additionalImages: DriveImage[] = await response.json();
            setImages([...serverImages, ...additionalImages]);
          } else {
            throw new Error("Server unavailable");
          }
        } catch {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.8, type: "spring", stiffness: 100 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center py-24 bg-gray-50 min-h-screen font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 text-lg">Loading amazing images...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center py-24 bg-gray-50 min-h-screen font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <motion.button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium relative before:content-[''] before:absolute before:inset-0 before:bg-red-400/30 before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!images.length) {
    return (
      <motion.div
        className="flex justify-center items-center py-24 bg-gray-50 min-h-screen font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-600 text-xl">No images found.</p>
      </motion.div>
    );
  }

  const rows = createRows(images);
  const animationDuration = Math.max(30, Math.min(90, images.length * 2));

  return (
    <>
      <section className="bg-gray-50 py-24 px-6 lg:px-16 min-h-screen font-sans">
        <motion.div
          className="max-w-screen-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full text-red-600 font-medium mb-6 shadow-sm border border-red-100/50"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }}>
                <Heart className="w-5 h-5" />
              </motion.div>
              Gallery
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
              Helping Hands Gallery
            </h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Explore the heartwarming moments captured in our work. Click any image to see the impact of your support.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="w-32 h-1 bg-gradient-to-r from-red-600/90 to-red-400/90 mx-auto mt-6 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          <div className="space-y-10">
            {rows.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                variants={itemVariants}
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
                      <motion.div
                        key={`${rowIndex}-${i}`}
                        className="w-64 h-48 relative rounded-2xl overflow-hidden bg-white flex-shrink-0 cursor-pointer group/item border border-gray-100/30"
                        onClick={() => openModal(img, originalIndex)}
                        onMouseEnter={() => setHoveredImage(img.id)}
                        onMouseLeave={() => setHoveredImage(null)}
                        whileHover={{ y: -4, rotateX: 2, rotateY: 2, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)" }}
                        transition={{ type: "spring", stiffness: 250 }}
                      >
                        <motion.img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
                            hoveredImage === img.id ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <h3 className="text-white font-medium text-sm truncate">
                            {img.title.replace(/\.[^/.]+$/, "")}
                          </h3>
                        </div>
                        <div
                          className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${
                            hoveredImage === img.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                          }`}
                        >
                          <motion.button
                            onClick={(e) => toggleLike(img.id, e)}
                            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                              likedImages.has(img.id)
                                ? "bg-red-500 text-white"
                                : "bg-white/90 text-gray-800 hover:bg-white"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart size={16} fill={likedImages.has(img.id) ? "currentColor" : "none"} />
                          </motion.button>
                          <motion.button
                            onClick={(e) => handleShare(img, e)}
                            className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors backdrop-blur-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Share2 size={16} />
                          </motion.button>
                          <motion.button
                            className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors backdrop-blur-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ZoomIn size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative max-w-5xl max-h-full w-full">
            <motion.button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
            <motion.button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 text-gray-800 hover:bg-white transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
            <motion.div
              className="flex items-center justify-center h-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-lg p-4 text-gray-800 border border-gray-100/30"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedImage.title.replace(/\.[^/.]+$/, "")}</h3>
                  <p className="text-sm text-gray-600">
                    Image {currentIndex + 1} of {images.length}
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={(e) => toggleLike(selectedImage.id, e)}
                    className={`p-3 rounded-full transition-colors ${
                      likedImages.has(selectedImage.id)
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart size={20} fill={likedImages.has(selectedImage.id) ? "currentColor" : "none"} />
                  </motion.button>
                  <motion.button
                    onClick={(e) => handleDownload(selectedImage, e)}
                    className="p-3 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download size={20} />
                  </motion.button>
                  <motion.button
                    onClick={(e) => handleShare(selectedImage, e)}
                    className="p-3 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}