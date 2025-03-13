"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  ImageIcon,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import type { Post } from "./admin-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import ImageUploader from "./image-uploader";

export default function PostEditor({
  onSubmit,
}: {
  onSubmit: (post: Post) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [coverImage, setCoverImage] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      excerpt,
      status,
      coverImage,
      createdAt: new Date(),
    });
    setTitle("");
    setContent("");
    setExcerpt("");
    setCoverImage("");
    setStatus("draft");
  };

  const insertFormatting = (tag: string) => {
    if (!contentRef.current) return;

    const start = contentRef.current.selectionStart;
    const end = contentRef.current.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    let newText = "";

    switch (tag) {
      case "b":
        newText = `${beforeText}**${selectedText}**${afterText}`;
        break;
      case "i":
        newText = `${beforeText}*${selectedText}*${afterText}`;
        break;
      case "u":
        newText = `${beforeText}<u>${selectedText}</u>${afterText}`;
        break;
      case "h1":
        newText = `${beforeText}# ${selectedText}${afterText}`;
        break;
      case "h2":
        newText = `${beforeText}## ${selectedText}${afterText}`;
        break;
      case "ul":
        newText = `${beforeText}\n- ${selectedText}${afterText}`;
        break;
      case "ol":
        newText = `${beforeText}\n1. ${selectedText}${afterText}`;
        break;
      case "img":
        newText = `${beforeText}![Image description](image-url)${afterText}`;
        break;
      case "link":
        newText = `${beforeText}[${selectedText}](url)${afterText}`;
        break;
      default:
        return;
    }

    setContent(newText);

    // Focus back on textarea after formatting
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus();
        contentRef.current.selectionStart = contentRef.current.selectionEnd =
          start + newText.length - afterText.length;
      }
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Input
                className="text-2xl font-bold border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md mb-4 flex flex-wrap gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("b")}
                >
                  <Bold size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("i")}
                >
                  <Italic size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("u")}
                >
                  <Underline size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("h1")}
                >
                  <Heading1 size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("h2")}
                >
                  <Heading2 size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("ul")}
                >
                  <List size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("ol")}
                >
                  <ListOrdered size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("img")}
                >
                  <ImageIcon size={18} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("link")}
                >
                  <Link size={18} />
                </Button>
                <div className="ml-auto flex">
                  <Button type="button" variant="ghost" size="sm">
                    <AlignLeft size={18} />
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    <AlignCenter size={18} />
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    <AlignRight size={18} />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="write">
                <TabsList className="mb-4">
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="write">
                  <Textarea
                    ref={contentRef}
                    placeholder="Write your post content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="min-h-[300px] resize-y"
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <div className="min-h-[300px] p-4 border rounded-md prose dark:prose-invert max-w-none">
                    {content ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: content.replace(/\n/g, "<br>"),
                        }}
                      />
                    ) : (
                      <p className="text-gray-400">Preview will appear here</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Publish</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={status}
                    onValueChange={(value) =>
                      setStatus(value as "draft" | "published")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit">Publish</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Featured Image</h3>
              <ImageUploader
                onImageSelected={setCoverImage}
                currentImage={coverImage}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Excerpt</h3>
              <Textarea
                placeholder="Write a short excerpt for your post..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="resize-y"
              />
              <p className="text-sm text-gray-500 mt-2">
                Excerpts are short descriptions used in post listings.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
