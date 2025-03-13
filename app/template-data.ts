import {
  Song,
  Album,
  Release,
  GalleryImage,
  ArtistBio,
  // Concert,
} from "@/types/music";

export const templateSongs: Song[] = [
  {
    id: "1",
    rank: 1,
    title: "Grenade",
    artist: "Bruno Mars",
    duration: "4:02",
    coverUrl: "/bold.png",
    audioUrl: "/audio/grenade.mp3",
  },
  {
    id: "2",
    rank: 2,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    duration: "3:42",
    coverUrl: "/bold.png",
    audioUrl: "/audio/just-the-way-you-are.mp3",
  },
  {
    id: "3",
    rank: 2,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    duration: "3:42",
    coverUrl: "/bold.png",
    audioUrl: "/audio/just-the-way-you-are.mp3",
  },
  {
    id: "4",
    rank: 2,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    duration: "3:42",
    coverUrl: "/bold.png",
    audioUrl: "/audio/just-the-way-you-are.mp3",
  },
  {
    id: "5",
    rank: 2,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    duration: "3:42",
    coverUrl: "/bold.png",
    audioUrl: "/audio/just-the-way-you-are.mp3",
  },
  {
    id: "6",
    rank: 2,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    duration: "3:42",
    coverUrl: "/bold.png",
    audioUrl: "/audio/just-the-way-you-are.mp3",
  },
  {
    id: "7",
    rank: 2,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    duration: "3:42",
    coverUrl: "/bold.png",
    audioUrl: "/audio/just-the-way-you-are.mp3",
  },
  {
    id: "8",
    rank: 2,
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    duration: "3:42",
    coverUrl: "/bold.png",
    audioUrl: "/audio/just-the-way-you-are.mp3",
  },
];

export const templateAlbums: Album[] = [
  {
    id: "1",
    title: "Unorthodox Jukebox",
    artist: "Bruno Mars",
    year: "2012",
    coverUrl: "/bold.png",
    type: "album",
  },
  {
    id: "2",
    title: "Doo-Wops & Hooligans",
    artist: "Bruno Mars",
    year: "2010",
    coverUrl: "/bold.png",
    type: "album",
  },
  {
    id: "3",
    title: "Unorthodox Jukebox",
    artist: "Bruno Mars",
    year: "2012",
    coverUrl: "/bold.png",
    type: "album",
  },
  {
    id: "4",
    title: "Doo-Wops & Hooligans",
    artist: "Bruno Mars",
    year: "2010",
    coverUrl: "/bold.png",
    type: "album",
  },
  {
    id: "5",
    title: "Unorthodox Jukebox",
    artist: "Bruno Mars",
    year: "2012",
    coverUrl: "/bold.png",
    type: "album",
  },
  // {
  //   id: "6",
  //   title: "Doo-Wops & Hooligans",
  //   artist: "Bruno Mars",
  //   year: "2010",
  //   coverUrl: "/bold.png",
  //   type: "album",
  // },
  // {
  //   id: "7",
  //   title: "Unorthodox Jukebox",
  //   artist: "Bruno Mars",
  //   year: "2012",
  //   coverUrl: "/bold.png",
  //   type: "album",
  // },
  // {
  //   id: "8",
  //   title: "Doo-Wops & Hooligans",
  //   artist: "Bruno Mars",
  //   year: "2010",
  //   coverUrl: "/bold.png",
  //   type: "album",
  // },
];

export const templateReleases: Release[] = [
  {
    id: "1",
    title: "Bruno Mars ft. JackMan",
    artist: "Bruno Mars",
    coverUrl: "/bold.png",
    releaseDate: "2024-03-01",
    type: "single",
  },
  {
    id: "2",
    title: "Bruno Mars ft. Tatar",
    artist: "Bruno Mars",
    coverUrl: "/bold.png",
    releaseDate: "2024-02-15",
    type: "collaboration",
  },
];

// export const Concert: Release[] = [
//   {
//     id: "1",
//     title: "Bruno Mars ft. JackMan",
//     artist: "Bruno Mars",
//     coverUrl: "/bold.png",
//     releaseDate: "2024-03-01",
//     type: "single",
//   },
//   {
//     id: "2",
//     title: "Bruno Mars ft. Tatar",
//     artist: "Bruno Mars",
//     coverUrl: "/bold.png",
//     releaseDate: "2024-02-15",
//     type: "collaboration",
//   },
// ];

export const templateGalleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "/bold.png",
    alt: "Bruno Mars performing live",
    width: 400,
    height: 400,
  },
  {
    id: "2",
    url: "/bold.png",
    alt: "Bruno Mars studio session",
    width: 400,
    height: 400,
  },
  {
    id: "3",
    url: "/bold.png",
    alt: "Bruno Mars studio session",
    width: 400,
    height: 400,
  },
  {
    id: "4",
    url: "/bold.png",
    alt: "Bruno Mars studio session",
    width: 400,
    height: 400,
  },
];

export const templateBio: ArtistBio = {
  shortBio:
    "Энэ залуу нь 2022 оны шилдэгийн шилдэг дуучнаар шалгарсан бөгөөд түүний 'Grenade' дуу нь 2022 оны шилдэг дуугаар тодорсон юм.",
  fullBio:
    "Энэ залуу нь 2022 оны шилдэгийн шилдэг дуучнаар шалгарсан бөгөөд түүний 'Grenade' дуу нь 2022 оны шилдэг дуугаар тодорсон юм. Мөн тэрээр 2023 онд нийт 2500 дуу гаргасан анхны гэр бичиг...",
  monthlyListeners: 148500000,
  topCities: ["New York", "London", "Tokyo", "Paris", "Seoul"],
};
