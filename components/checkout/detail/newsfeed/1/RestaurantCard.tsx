"use client";

import { useState } from "react";
import { Calendar, Clock, Heart, MessageSquare, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RestaurantCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  likes?: number;
  comments?: number;
}

export function RestaurantCard({
  title,
  description,
  date,
  time,
  image,
  likes = 23,
  comments = 23,
}: RestaurantCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className=" w-full flex gap-5 px-56 dark:bg-gray-950 border-gray-200 dark:border-gray-800">
      <div className="w-[300px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-900 dark:text-white">
            {title}
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
            <Clock className="ml-2 h-4 w-4" />
            <span>{time}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-60 w-full overflow-hidden">
            <img
              src="https://www.travelandleisure.com/thmb/y89tkStO6XR422tnf3AvBKxQ6W4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-romantic-dining-table-RMANTCRESTRNT0225-2af03e348fcd4698898f3d69f6cdd240.jpg"
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsLiked(!isLiked)}>
              <Heart
                className={`h-4 w-4 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span>{isLiked ? likes + 1 : likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <MessageSquare className="h-4 w-4" />
              <span>{comments}</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Share2 className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700">
                  see more...
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-white">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    {description}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="rounded-md overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Details
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{date}</span>
                      <Clock className="ml-2 h-4 w-4" />
                      <span>{time}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Куэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа
                      ийм сайхан вино уугаад сүүх
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </div>
      <div className="w-[300px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-900 dark:text-white">
            {title}
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
            <Clock className="ml-2 h-4 w-4" />
            <span>{time}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-60 w-full overflow-hidden">
            <img
              src="https://www.travelandleisure.com/thmb/y89tkStO6XR422tnf3AvBKxQ6W4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TAL-romantic-dining-table-RMANTCRESTRNT0225-2af03e348fcd4698898f3d69f6cdd240.jpg"
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsLiked(!isLiked)}>
              <Heart
                className={`h-4 w-4 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span>{isLiked ? likes + 1 : likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <MessageSquare className="h-4 w-4" />
              <span>{comments}</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Share2 className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700">
                  see more...
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-white">
                    {title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    {description}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="rounded-md overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Details
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{date}</span>
                      <Clock className="ml-2 h-4 w-4" />
                      <span>{time}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Куэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа
                      ийм сайхан вино уугаад сүүх
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </div>
    </div>
  );
}
