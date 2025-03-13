"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, X, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  currentImage?: string;
  aspectRatio?: string;
  height?: number;
  error?: string;
}

export default function ImageUploader({
  onImageSelected,
  currentImage = "",
  aspectRatio = "1:1",
  height = 200,
  error,
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewUrl("");
    onImageSelected("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {previewUrl ? (
        <div className="relative" style={{ height: `${height}px` }}>
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-full object-cover rounded-md"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-red-600 hover:bg-red-700"
            onClick={removeImage}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md flex flex-col items-center justify-center ${
            isDragging
              ? "border-orange-500 bg-orange-500/10"
              : error
              ? "border-red-500 bg-red-900/20"
              : "border-gray-600"
          }`}
          style={{ height: `${height}px` }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div
            className={`p-3 rounded-full ${
              error ? "bg-red-900" : "bg-gray-700"
            }`}
          >
            {error ? (
              <AlertCircle className="h-6 w-6 text-red-500" />
            ) : (
              <ImageIcon className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div className="text-sm text-gray-400 mt-2">
            <span className="font-medium">Click to upload</span> or drag and
            drop
          </div>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF</p>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
