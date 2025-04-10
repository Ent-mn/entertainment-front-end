import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import {
  Calendar,
  Clock,
  Facebook,
  Heart,
  Instagram,
  MessageSquare,
  Share2,
} from "lucide-react";
import React, { useState } from "react";

const DetailNewsFeed1 = () => {
  const [isLiked, setIsLiked] = useState(false);
  const likes = 23;

  return (
    <div className="flex gap-14 px-52 dark:bg-[#121212] bg-[#F3F3F3] text-[#121212] dark:text-[#F3F3F3] py-20">
      <div className="flex flex-col">
        <div className="text-left w-[350px] py-2">
          <h3 className="text-lg font-medium text-[#121212] dark:text-[#F3F3F3]">
            Bourique Bond - Restaurant
          </h3>
          <span className="block w-[118px] border-t mb-2 mt-2 border-[#F5BE32] bg-[#F5BE32]"></span>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Тэгээд одоо яахав дээ гоё юм чинь үнэтэй шдээ. Үнэтэй юманд дуртай
            лаг юманд дуртай л биз дээ.{" "}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="">see more...</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] dark:bg-[#121212] bg-[#F3F3F3] text-[#121212] dark:text-[#F3F3F3]">
                <AlertDialogHeader>
                  <DialogTitle className="text-[#121212] dark:text-[#F3F3F3]">
                    asd
                  </DialogTitle>
                  <DialogDescription className="text-[#121212] dark:text-[#F3F3F3]">
                    asd
                  </DialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4">
                  <div className="rounded-md overflow-hidden">
                    <img
                      src=""
                      alt="Detail"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-[#121212] dark:text-[#F3F3F3]">
                      Details
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>ASDASDASD</span>
                      <Clock className="ml-2 h-4 w-4" />
                      <span>asdad</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Куэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа
                      ийм сайхан вино уугаад сүүх
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>2025.10.05</span>
            <span className="mx-1">21:30</span>
          </div>
        </div>
        <img
          src="/detail/image copy 2.png"
          alt="Main"
          className="w-[450px] h-[500px] rounded"
        />
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
              <span></span>
            </Button>
          </div>
          <div className="flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Facebook className="h-4 w-4" />{" "}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Instagram className="h-4 w-4" />{" "}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </div>
      <div className="flex flex-col">
        <div className="text-left w-[350px] py-2">
          <h3 className="text-lg font-medium text-[#121212] dark:text-[#F3F3F3]">
            Bourique Bond - Restaurant
          </h3>
          <span className="block w-[118px] border-t mb-2 mt-2 border-[#F5BE32] bg-[#F5BE32]"></span>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Тэгээд одоо яахав дээ гоё юм чинь үнэтэй шдээ. Үнэтэй юманд дуртай
            лаг юманд дуртай л биз дээ.{" "}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="">see more...</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] dark:bg-[#121212] bg-[#F3F3F3] text-[#121212] dark:text-[#F3F3F3]">
                <AlertDialogHeader>
                  <DialogTitle className="text-[#121212] dark:text-[#F3F3F3]">
                    asd
                  </DialogTitle>
                  <DialogDescription className="text-[#121212] dark:text-[#F3F3F3]">
                    asd
                  </DialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4">
                  <div className="rounded-md overflow-hidden">
                    <img
                      src=""
                      alt="Detail"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-[#121212] dark:text-[#F3F3F3]">
                      Details
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>ASDASDASD</span>
                      <Clock className="ml-2 h-4 w-4" />
                      <span>asdad</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Куэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа
                      ийм сайхан вино уугаад сүүх
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>2025.10.05</span>
            <span className="mx-1">21:30</span>
          </div>
        </div>
        <img
          src="/detail/image copy 2.png"
          alt="Main"
          className="w-[450px] h-[500px] rounded"
        />
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
              <span></span>
            </Button>
          </div>
          <div className="flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Facebook className="h-4 w-4" />{" "}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Instagram className="h-4 w-4" />{" "}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </div>
      <div className="flex flex-col">
        <div className="text-left w-[350px] py-2">
          <h3 className="text-lg font-medium text-[#121212] dark:text-[#F3F3F3]">
            Bourique Bond - Restaurant
          </h3>
          <span className="block w-[118px] border-t mb-2 mt-2 border-[#F5BE32] bg-[#F5BE32]"></span>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Тэгээд одоо яахав дээ гоё юм чинь үнэтэй шдээ. Үнэтэй юманд дуртай
            лаг юманд дуртай л биз дээ.{" "}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="">see more...</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] dark:bg-[#121212] bg-[#F3F3F3] text-[#121212] dark:text-[#F3F3F3]">
                <AlertDialogHeader>
                  <DialogTitle className="text-[#121212] dark:text-[#F3F3F3]">
                    asd
                  </DialogTitle>
                  <DialogDescription className="text-[#121212] dark:text-[#F3F3F3]">
                    asd
                  </DialogDescription>
                </AlertDialogHeader>
                <div className="grid gap-4">
                  <div className="rounded-md overflow-hidden">
                    <img
                      src=""
                      alt="Detail"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-[#121212] dark:text-[#F3F3F3]">
                      Details
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>ASDASDASD</span>
                      <Clock className="ml-2 h-4 w-4" />
                      <span>asdad</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Куэ за тэгээд ийм сайхан хотын төвд, ийм сайхан зуны гадаа
                      ийм сайхан вино уугаад сүүх
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>2025.10.05</span>
            <span className="mx-1">21:30</span>
          </div>
        </div>
        <img
          src="/detail/image copy 2.png"
          alt="Main"
          className="w-[450px] h-[500px] rounded"
        />
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
              <span></span>
            </Button>
          </div>
          <div className="flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Facebook className="h-4 w-4" />{" "}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Instagram className="h-4 w-4" />{" "}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
};

export default DetailNewsFeed1;
