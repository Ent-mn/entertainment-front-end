import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  RotateCcw,
  X,
  FileText,
  Undo2,
  Redo2,
  Image as ImageIcon,
} from "lucide-react";

interface SignaturePadProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const sigCanvas = useRef<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageTransform, setImageTransform] = useState<{
    x: number;
    y: number;
    scale: number;
  } | null>(null);

  useEffect(() => {
    if (sigCanvas.current) {
      const canvas = sigCanvas.current.getCanvas();
      // Set canvas size based on container size
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    }
  }, [isOpen]);

  const redrawImage = (dataUrl: string) => {
    if (!sigCanvas.current) return;

    const canvas = sigCanvas.current.getCanvas();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Reset the canvas transformation
    ctx.setTransform(1, 0, 0, 1, 0, 0);

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

      // Store the transform information
      setImageTransform({ x, y, scale });

      // Draw the image centered
      ctx.drawImage(image, x, y, newWidth, newHeight);
    };
  };

  const clear = () => {
    if (sigCanvas.current) {
      const currentState = sigCanvas.current.toDataURL();
      setUndoStack([...undoStack, currentState]);
      setRedoStack([]);
      sigCanvas.current.clear();
      setIsDrawing(false);
      setUploadedImage(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        // Clear the canvas before drawing the new image
        if (sigCanvas.current) {
          sigCanvas.current.clear();
          redrawImage(result);
        }
        setIsDrawing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const undo = () => {
    if (sigCanvas.current && undoStack.length > 0) {
      const currentState = sigCanvas.current.toDataURL();
      const lastState = undoStack[undoStack.length - 1];

      setRedoStack([...redoStack, currentState]);
      setUndoStack(undoStack.slice(0, -1));

      // Clear the canvas before redrawing
      sigCanvas.current.clear();
      redrawImage(lastState);
    }
  };

  const redo = () => {
    if (sigCanvas.current && redoStack.length > 0) {
      const currentState = sigCanvas.current.toDataURL();
      const nextState = redoStack[redoStack.length - 1];

      setUndoStack([...undoStack, currentState]);
      setRedoStack(redoStack.slice(0, -1));

      // Clear the canvas before redrawing
      sigCanvas.current.clear();
      redrawImage(nextState);
    }
  };

  const handleDraw = (e: any) => {
    if (!sigCanvas.current) return;

    const canvas = sigCanvas.current.getCanvas();
    const rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    // Adjust coordinates if there's an image transformation
    if (imageTransform) {
      const { x, y, scale } = imageTransform;
      // Adjust mouse coordinates to account for the image's position and scale
      mouseX = (mouseX - x) / scale;
      mouseY = (mouseY - y) / scale;
    }

    // Store the current state for undo
    const currentState = sigCanvas.current.toDataURL();
    setUndoStack([...undoStack, currentState]);
    setRedoStack([]);
    setIsDrawing(true);
  };

  const save = () => {
    if (sigCanvas.current?.isEmpty() && !uploadedImage) return;
    const signature = sigCanvas.current?.toDataURL();
    onSave(signature);
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
              Signature<span className="text-[#f5be32]">.</span>
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

        <div className="absolute right-2 bg-white top-24 flex items-center gap-2">
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <Undo2 size={16} className="text-gray-600" />
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <Redo2 size={16} className="text-gray-600" />
          </button>
          <button
            onClick={clear}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <RotateCcw size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="px-4 bg-white rounded-t-xl pt-12 pb-4">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              className: "w-full h-[300px]",
              style: {
                background: "#ffffff",
              },
            }}
            onBegin={handleDraw}
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
            disabled={!isDrawing && !uploadedImage}
            className="flex w-fit px-12 py-2.5 bg-gradient-to-r from-[#EAC947] to-[#F6A253] text-white text-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Оруулах
          </button>
        </div>
      </div>
    </>
  );
};

export default SignaturePad;
