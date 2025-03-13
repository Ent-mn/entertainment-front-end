"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostEditor from "./post-editor";
import PostsList from "./posts-list";
import Sidebar from "./sidebar";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Post) => {
    setPosts([...posts, { ...post, id: Date.now().toString() }]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="editor">Create Post</TabsTrigger>
              <TabsTrigger value="posts">All Posts</TabsTrigger>
            </TabsList>
            <TabsContent value="editor">
              <PostEditor onSubmit={addPost} />
            </TabsContent>
            <TabsContent value="posts">
              <PostsList posts={posts} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export type Post = {
  id?: string;
  title: string;
  content: string;
  coverImage?: string;
  excerpt?: string;
  status?: "draft" | "published";
  createdAt?: Date;
};
