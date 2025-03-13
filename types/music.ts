export interface Song {
  id: string;
  rank?: number;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
  isExplicit?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: string;
  coverUrl: string;
  type: "album" | "single" | "ep";
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  type: "album" | "single" | "collaboration";
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArtistBio {
  shortBio: string;
  fullBio: string;
  monthlyListeners?: number;
  topCities?: string[];
}
