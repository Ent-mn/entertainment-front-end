export type VenueType = "A Area" | "B Area" | "C Area" | "Ресторан" | "Event Hall" | "Гэр Талбай";

export interface Venue {
  id: number;
  name: string;
  type: VenueType;
  location: [number, number];
  stars: number;
  image: string;
  capacity: number;
  price: number;
  date: string;
  sale: number;
} 