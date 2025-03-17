// /** @format */
// "use client";
// import { BannerCarousel } from "@/components/banner-carousel/BannerCarousel";
// import { Banner2 } from "@/components/banner/Banner2";
// import CreateEvent from "@/components/create-event/CreateEvent";
// import EntertainmentPage from "@/components/entertainment";
// import { Events } from "@/components/eventAndConcert/Events";
// import FavoriteArtist from "@/components/favorite-artist/FavoriteArtists";
// import FavoriteProduct from "@/components/favoriteProduct/FavoriteProduct";
// import FavoriteService from "@/components/favoriteService.tsx/FavoriteService";

// import Footer from "@/components/footer";
// import { Header } from "@/components/header/header";
// import VideoToturial from "@/components/video-toturial/VideoToturial";

// interface artistdataType {
//   title: string;
//   image?: string;
//   imageSize?: "sm" | "md" | "lg" | "full";
//   background?: "white" | "gray" | "black";
//   textColor?: "black" | "white" | "gray";
//   size?: "sm" | "md" | "lg";
//   border?: "none" | "rounded" | "shadow";
//   hoverEffect?: boolean;
//   rating?: number;
//   price?: string | number;
//   onSale?: boolean;
//   logo?: string;
// }

// const artistdata: artistdataType[] = [
//   {
//     size: "lg",
//     title: "Thunder ch ymu",
//     image: "image.png",
//     imageSize: "full",
//     background: "gray",
//     price: 3000000,
//     textColor: "white",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 2,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Thunder ch ymu",
//     image: "image.png",
//     imageSize: "full",
//     background: "gray",
//     price: 3000000,
//     textColor: "white",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 2,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Thunder ch ymu",
//     image: "image.png",
//     imageSize: "full",
//     background: "gray",
//     price: 3000000,
//     textColor: "white",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 2,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Thunder ch ymu",
//     image: "image.png",
//     imageSize: "full",
//     background: "gray",
//     price: 3000000,
//     textColor: "white",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 2,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Thunder ch ymu",
//     image: "image.png",
//     imageSize: "full",
//     background: "gray",
//     price: 3000000,
//     textColor: "white",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 2,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Thunder ch ymu",
//     image: "image.png",
//     imageSize: "full",
//     background: "gray",
//     price: 3000000,
//     textColor: "white",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 2,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Thunder ch ymu",
//     image: "image.png",
//     imageSize: "full",
//     background: "gray",
//     price: 3000000,
//     textColor: "white",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 2,
//     logo: "/image copy.png",
//     onSale: true,
//   },
// ];

// const servicedata: artistdataType[] = [
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
//   {
//     size: "lg",
//     title: "Гүзээлзгэнэтэй бялуу",
//     image: "image copy 3.png",
//     imageSize: "md",
//     background: "white",
//     price: "50,000₮ - 150,000₮",
//     textColor: "black",
//     border: "rounded",
//     hoverEffect: true,
//     rating: 4,
//     logo: "/image copy.png",
//     onSale: true,
//   },
// ];

// // const eventData: artistdataType[] = [
// //   {
// //     size: "lg",
// //     title: "Thunder ch ymu",
// //     image: "image.png",
// //     imageSize: "md",
// //     background: "gray",
// //     price: 3000000,
// //     textColor: "white",
// //     border: "rounded",
// //     hoverEffect: true,
// //     onSale: false,
// //   },
// //   {
// //     size: "lg",
// //     title: "Thunder ch ymu",
// //     image: "image.png",
// //     imageSize: "md",
// //     background: "gray",
// //     price: 3000000,
// //     textColor: "white",
// //     border: "rounded",
// //     hoverEffect: true,
// //     onSale: false,
// //   },
// //   {
// //     size: "lg",
// //     title: "Thunder ch ymu",
// //     image: "image.png",
// //     imageSize: "md",
// //     background: "gray",
// //     price: 3000000,
// //     textColor: "white",
// //     border: "rounded",
// //     hoverEffect: true,
// //     onSale: false,
// //   },
// //   {
// //     size: "lg",
// //     title: "Thunder ch ymu",
// //     image: "image.png",
// //     imageSize: "md",
// //     background: "gray",
// //     price: 3000000,
// //     textColor: "white",
// //     border: "rounded",
// //     hoverEffect: true,
// //     onSale: false,
// //   },
// // ];
// // const videoData: artistdataType[] = [
// //   {
// //     size: "md",
// //     title: "Өөрийн эвент үүсгэх заавар",
// //     image: "image.png",
// //     imageSize: "md",
// //     background: "gray",
// //     textColor: "white",
// //     border: "rounded",
// //     hoverEffect: true,
// //     onSale: false,
// //   },
// //   {
// //     size: "md",
// //     title: "Өөрийн эвент үүсгэх заавар",
// //     image: "image.png",
// //     imageSize: "md",
// //     background: "gray",
// //     textColor: "white",
// //     border: "rounded",
// //     hoverEffect: true,
// //     onSale: false,
// //   },
// //   {
// //     size: "md",
// //     title: "Өөрийн эвент үүсгэх заавар",
// //     image: "image.png",
// //     imageSize: "md",
// //     background: "gray",
// //     textColor: "white",
// //     border: "rounded",
// //     hoverEffect: true,
// //     onSale: false,
// //   },
// //   {
// //     size: "md",
// //     title: "Өөрийн эвент үүсгэх заавар",
// //     image: "image.png",
// //     imageSize: "md",
// //     background: "gray",
// //     textColor: "white",
// //     border: "rounded",
// //     hoverEffect: true,
// //     onSale: false,
// //   },
// //   {
// //     size: "md",
// //     title: "Өөрийн эвент үүсгэх заавар",
// //     image: "image.png",
// //     imageSize: "md",
// //     background: "gray",
// //     textColor: "white",
// //     border: "rounded",
// //     hoverEffect: true,
// //     onSale: false,
// //   },
// // ];

// const Page = () => {
//   return (
//     <div className="w-full min-h-screen flex flex-col justify-center">
//       <Header />

//       <BannerCarousel />
//       <EntertainmentPage />
//       {/* <VideoToturial videoData={videoData} />
//       <CreateEvent eventData={eventData} /> */}
//       <Events />
//       <FavoriteArtist artistdata={artistdata} />
//       <FavoriteService servicedata={servicedata} />
//       <Banner2 />
//       <FavoriteProduct productdata={servicedata} />
//       <Footer />
//     </div>
//   );
// };

// export default Page;

import ThemeToggle from "@/components/ThemeToggle";
import React from "react";

const Home = () => {
  return (
    <div>
      <ThemeToggle />
      test
    </div>
  );
};

export default Home;
