export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: string;
  dimensions: string;
  price?: string; // Optional, for inquiry context
  status: 'Available' | 'Sold' | 'Reserved';
  imageUrl: string;
  collectionId: string;
  description: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  yearRange: string;
  coverImage: string;
}

export interface Exhibition {
  id: string;
  title: string;
  gallery: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'Upcoming' | 'Current' | 'Past';
  imageUrl: string;
}

export interface ClientDiaryEntry {
  id: string;
  title: string; // e.g., "Private Residence, Lahore"
  location: string;
  date: string;
  description: string;
  imageUrl: string; // Image of art on wall
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  likes: number;
}