"use client";

import { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BioSectionProps {
  bio: string;
  updateBio: (bio: string) => void;
  error?: string;
}

export default function BioSection({ bio, updateBio, error }: BioSectionProps) {
  const [bioText, setBioText] = useState(bio);
  const [formError, setFormError] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = bioText;
    }
  }, []);

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setBioText(content);
      updateBio(content);

      if (!editorRef.current.textContent?.trim()) {
        setFormError("Bio content is required");
      } else {
        setFormError(null);
      }
    }
  };

  const applyFormatting = (command: string, value: string | null = null) => {
    document.execCommand(command, false,);
    handleEditorChange();
    editorRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Artist Bio</h2>
        <div className="text-gray-400 mb-4">
          Write a biography for the artist. This will appear in the bio section.
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="bg-red-900 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="bg-white text-black p-2 rounded-md flex flex-wrap gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyFormatting("bold")}
            className="hover:bg-gray-600"
          >
            <Bold size={18} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => applyFormatting("italic")}
            className="hover:bg-gray-600"
          >
            <Italic size={18} />
          </Button>
        </div>

        <div>
          <Label htmlFor="artistBio">Biography</Label>
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorChange}
            onBlur={handleEditorChange}
            className={`w-full min-h-[200px] p-3 border rounded-md mt-1 bg-white text-black border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              formError ? "border-red-500" : ""
            }`}
            style={{ overflowY: "auto" }}
          />
          {formError && (
            <div className="text-red-500 text-sm mt-1">{formError}</div>
          )}
          <div className="text-sm text-gray-400 mt-2">
            Use the formatting toolbar to style your text. Select text and click
            a formatting button.
          </div>
        </div>
      </div>
    </div>
  );
}
