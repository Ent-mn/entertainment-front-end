import React, { useRef, useState, useEffect } from "react";
import { X, FileText, Image as ImageIcon } from "lucide-react";

interface StampPadProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stamp: string) => void;
}

const StampPad: React.FC<StampPadProps> = ({ isOpen, onClose, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    }
  }, [isOpen]);

  const drawImage = (dataUrl: string) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const image = new Image();
    image.src = dataUrl;
    image.onload = () => {
      // Calculate the scale to fit the image while maintaining aspect ratio
      const scale = Math.min(
        canvasWidth / image.width,
        canvasHeight / image.height
      );

      // Calculate new dimensions
      const newWidth = image.width * scale;
      const newHeight = image.height * scale;

      // Calculate center position
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      // Draw the image centered
      ctx.drawImage(image, x, y, newWidth, newHeight);
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        drawImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const save = () => {
    if (!uploadedImage || !canvasRef.current) return;
    const stamp = canvasRef.current.toDataURL();
    onSave(stamp);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] rounded-[20px] z-50 overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <FileText className="text-[#F5be32] w-[35px] h-[35px]" />
            <h1 className="text-4xl font-extrabold">
              Stamp<span className="text-[#f5be32]">.</span>
            </h1>
          </div>
          <button
            onClick={onClose}
            className="relative w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <div className="absolute inset-0 border-2 border-[#F5BE32] rounded-full"></div>
            <X className="w-5 h-5 text-[#F5BE32]" />
          </button>
        </div>

        <div className="px-4 bg-white rounded-t-xl pt-12 pb-4">
          <canvas
            ref={canvasRef}
            className="w-full h-[300px] border-gray-200"
            style={{ background: "#ffffff" }}
          />
        </div>

        <div className="flex bg-white gap-3 items-center justify-end px-4 py-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex w-fit px-12 py-2.5 bg-gradient-to-r from-[#3E3E3E] to-[#787878B2] text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Файл
          </button>
          <button
            onClick={save}
            disabled={!uploadedImage}
            className="flex w-fit px-12 py-2.5 bg-gradient-to-r from-[#EAC947] to-[#F6A253] text-white text-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Оруулах
          </button>
        </div>
      </div>
    </>
  );
};

export default StampPad;
